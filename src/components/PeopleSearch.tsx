import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";
import ICard from "../types/Card";

const API_URL = "https://swapi.dev/api/people/";

const PeopleSearch = () => {
  const [people, setPeople] = useState<ICard[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<null | string>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("no-sort");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (withSearch = false) => {
    if (loading) return;

    setLoading(true);
    if (!nextUrl || withSearch) {
      setPeople([]);
    }

    const url = !nextUrl || withSearch ? API_URL : nextUrl;

    axios
      .get(url, {
        params: {
          search: search,
        },
      })
      .then((res) => {
        setCount(res.data.count);
        setNextUrl(res.data.next);
        setPeople((prevPeople) => [...prevPeople, ...res.data.results]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSort(e.target.value);
  };

  const sortPeople = (personA: ICard, personB: ICard) => {
    if (sort === "a-z") return personA.name.localeCompare(personB.name);
    if (sort === "z-a") return personB.name.localeCompare(personA.name);
    if (sort === "male")
      return personB.gender?.localeCompare(personA.gender as string) || 0;
    if (sort === "female")
      return personA.gender?.localeCompare(personB.gender as string) || 0;

    return 0;
  };

  return (
    <>
      <div style={{ marginBottom: 32, display: "flex", gap: 8 }}>
        <TextField
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ width: 300, maxWidth: "100%" }}
        />
        <Button variant="contained" onClick={() => fetchData(true)}>
          Search
        </Button>
      </div>

      {loading && people.length === 0 ? (
        <CircularProgress />
      ) : (
        <>
          <Typography style={{ marginBottom: 16 }}>
            Showing {people.length} results of {count}
          </Typography>

          <Select
            value={sort}
            onChange={handleSortChange}
            style={{ minWidth: 200, marginBottom: 16 }}
          >
            <MenuItem value="no-sort" disabled>
              Sort by
            </MenuItem>
            <MenuItem value="a-z">A-Z</MenuItem>
            <MenuItem value="z-a">Z-A</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>

          <Grid container spacing={2}>
            {people.sort(sortPeople).map((person: ICard, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={2}>
                <Card index={index} name={person.name} />
              </Grid>
            ))}
          </Grid>

          {nextUrl ? (
            <LoadingButton
              onClick={() => fetchData()}
              loading={loading}
              variant="contained"
              style={{ marginTop: 32, marginBottom: 128, width: "100%" }}
            >
              Load More
            </LoadingButton>
          ) : null}
        </>
      )}
    </>
  );
};

export default PeopleSearch;

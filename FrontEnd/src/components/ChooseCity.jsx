import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

let cities = [
  {
    id: 1,
    name: "CHENNAI",
  },
];

export default function ChooseCity() {
  const [open, setOpen] = React.useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  async function goToHomepage() {
    window.location.href = "http://localhost:3000/home";
  }

  return (
    <div>
      <Stack spacing={30} direction="row">
        {cities.map((post) => {
          return (
            <div key={post.id}>
              <Button
                style={{
                  maxHeight: "200px",
                  minHeight: "200px",
                  minWidth: "140px",
                }}
                variant="contained"
                color="secondary"
                onClick={goToHomepage}
              >
                {post.name}
              </Button>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}

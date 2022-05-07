import React from "react";
import "./Home.css";
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

var axios = require("axios");
var hotelInCity;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

var data = JSON.stringify({
  city_name: "chennai",
});

var config = {
  method: "get",
  url: "http://3.108.42.38:3000/api/get_hotels_in_cities",
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    hotelInCity = response.data.city_name;
  })
  .catch(function (error) {
    console.log(error);
  });

hotelInCity = [
  {
    name: "Hotel Grand Hyatt",
    hotel_image: "https://i.ytimg.com/vi/GWq-NKKhECg/maxresdefault.jpg",
    location: "Near Sea Beach",
    room_available: [
      {
        room_type: "deluxe",
        quantity: 10,
        price: 4500,
      },
      {
        room_type: "super-deluxe",
        quantity: 50,
        price: 7500,
      },
    ],
  },
  {
    name: "Hotel Sera Grand",
    hotel_image:
      "https://imgcld.yatra.com/ytimages/image/upload/t_seo_Hotel_w_930_h_550_c_fill_g_auto_q_40_f_jpg/v1568804849/Hotel/Chennai/00148426/Untitled_LgV3zl_eH2g6u.jpg",
    location: "Near SRM University",
    room_available: [
      {
        room_type: "deluxe",
        quantity: 15,
        price: 1500,
      },
      {
        room_type: "super-deluxe",
        quantity: 40,
        price: 2500,
      },
    ],
  },
  {
    name: "SRM Hotel",
    hotel_image:
      "https://imgcld.yatra.com/ytimages/image/upload/t_seo_Hotel_w_930_h_550_c_fill_g_auto_q_40_f_jpg/v1526905763/Hotel/Chennai/00001888/90286675_3OzLMF.jpg",
    location: "Kattankulathur",
    room_available: [
      {
        room_type: "deluxe",
        quantity: 10,
        price: 4500,
      },
      {
        room_type: "super-deluxe",
        quantity: 50,
        price: 7500,
      },
    ],
  },
  {
    name: "Hotel Westin",
    hotel_image:
      "http://static.businessworld.in/article/article_extra_large_image/1625812585_PIyuTG_18.jpg",
    location: "Velachery",
    room_available: [
      {
        room_type: "deluxe",
        quantity: 10,
        price: 4500,
      },
      {
        room_type: "super-deluxe",
        quantity: 50,
        price: 7500,
      },
    ],
  },
];

export default function Home() {
  const [open, setOpen] = React.useState(false);

  async function moveBackToHomeFromBooking() {
    window.alert("Successful Booking");
    var config = {
      method: "post",
      url: "http://3.108.42.38:3000/api/chennai_hotels",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    setTimeout(function () {
      document.querySelector(".bg-modal-booking").style.display = "none";
    }, 2000);
  }

  async function openModal() {
    document.querySelector(".bg-modal-booking").style.display = "flex";
  }
  async function closeModal() {
    document.querySelector(".bg-modal-booking").style.display = "none";
  }

  return (
    <div>
      <p>Showing you hotels in Chennai</p>
      <ImageList sx={{ width: 1000, height: 550 }}>
        {/* <ImageListItem key="Subheader" cols={2}>
//         <ListSubheader component="div">
//           Here are some matches for you....
//         </ListSubheader>
//       </ImageListItem> */}
        {hotelInCity.map((item) => (
          <ImageListItem key={item.hotel_image}>
            <img
              src={`${item.hotel_image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.hotel_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.location}
              actionIcon={
                <IconButton
                  onClick={openModal}
                  sx={{ color: "rgba(255, 255, 255, 0.80)" }}
                  aria-label={`info about ${item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div class="bg-modal-booking">
        <div class="modal-content-booking">
          <p
            style={{
              fontSize: 40,
              fontWeight: "bold",
              fontFamily: "Times New Roman, Times, serif",
            }}
            align="center"
          >
            BOOKING
          </p>
          <Stack
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={2}
            direction="row"
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              CHOOSE ROOM
            </p>
            <p>{"    "}</p>
            <select id="room" name="room">
              {/* {hotelInCity.map((item) => (
                <option value={item.room_available.room_type}>
                  standard
                  {/* {item.room_available.room_type} */}
              <option value="deluxe">Deluxe - Rs. 4500/-</option>
              <option value="super_deluxe">Super Deluxe - Rs. 7500/-</option>
            </select>
          </Stack>
          <br></br>

          <Stack
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={2}
            direction="row"
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              CHECK-IN DATE
            </p>
            <p> </p>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              style={{ paddingLeft: 20, paddingRight: 20 }}
            ></input>
          </Stack>
          <br></br>
          <Stack
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={2}
            direction="row"
          >
            <p
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
              }}
            >
              CHECK-OUT DATE
            </p>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              style={{ paddingLeft: 20, paddingRight: 20 }}
            ></input>
          </Stack>
          <br></br>

          <Stack
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={2}
            direction="row"
          >
            <Button
              onClick={moveBackToHomeFromBooking}
              variant="contained"
              color="warning"
              style={{
                maxWidth: "250px",
                maxHeight: "50px",
                minWidth: "250px",
                minHeight: "30px",
              }}
            >
              BOOK
            </Button>
            <Button
              onClick={closeModal}
              variant="contained"
              color="error"
              style={{
                maxWidth: "250px",
                maxHeight: "50px",
                minWidth: "250x",
                minHeight: "30px",
              }}
            >
              CANCEL
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./css/TheatreShowSingleFullDetails.css";
import { IoIosCloseCircle } from "react-icons/io";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function TheatreShowSingleFullDetails({ data }) {
  const [showDetails, setShowDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { open, setOpen, id, dateShow, idAndTime } = data;

  const SingleeShowDetailsShowingFetch = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_SERVER
        }/theatre/showview/${id}/${dateShow}/${idAndTime[0]}/${idAndTime[1]}/`
      );
      const data = response.data;
      console.log(response);
      if (response.status == 200) {
        // console.log(data);
        setShowDetails(data);
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    SingleeShowDetailsShowingFetch();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        className="ModalOfTheatreSHowSingleFullDetails"
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          className="ContainerBoxInTheatreShowingSingleFullDetails"
          sx={{
            ...style,
            border: "none",
            borderRadius: "5px",
            outline: "none",
            width: 700,
            height: 500,
          }}
        >
          <IoIosCloseCircle
            className="CloseButtonIcon"
            onClick={handleClose}
            style={{ float: "right", cursor: "pointer" }}
            size={30}
            color="grey"
          />

          <Box>
            {loading &&
              [showDetails].map((item, index) => (
                <Box key={index} className="mt-5">
                  <h2 id="parent-modal-title" className="text-center" >
                    {item.movies.movie_name[0].toUpperCase() +
                      item.movies.movie_name.slice(1)}
                  </h2>
                  <div className="MainContainerForImageAndDataInTheatreShowFullDetails">
                    <div className="ImageContainerInTheatreShowFullDetails">
                      <img
                        src={
                          import.meta.env.VITE_URL_SERVER + item.movies.poster
                        }
                      />
                    </div>
                    <div className="DataContainerInTheatreShowFullDetails">
                      <p>
                        <strong>Director</strong> : {item.movies.director}
                      </p>
                      <p>
                        <strong>Langugae</strong> : {item.language.name}
                      </p>
                      <p>
                        <strong>Date</strong> : {dateShow}
                      </p>
                      <p>
                        <strong>Time</strong> : {idAndTime[1]}
                      </p>
                      <p>
                        <strong style={{ display: "inline" }}>
                          Description :
                        </strong>{" "}
                        Loreias similique ipsa quo magnam quos natus dolorem
                        iure. Deserunt vitae voluptates pariatur vod.kfmv luptate modi
                        nostrum cum rem voluptatem.
                      </p>
                    </div>
                  </div>
                </Box>
              ))}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

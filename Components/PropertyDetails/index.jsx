// "use client";
// import React, { useState } from "react";
// import { Container } from "react-bootstrap";
// import PropertyInfo from "./PropertyInfo";
// import { Modal } from "react-bootstrap";
// import axios from "axios";
// const PropertyDetails = ({ homeId }) => {
//   const [lgShow, setLgShow] = useState(false);
//   const [file, setFile] = useState(null);
//   const [filename, setFilename] = useState("Choose File");
//   const [files, setFiles] = useState(null);
//   const [facility, setFacility] = useState([]);
//   const [error, setError] = useState({
//     status: false,
//     msg: "",
//   });
//   const [formData, setFormData] = useState({
//     flore: 1,
//     roomNo: "",
//     roomType: "",
//   });
//   const amenities = ["Bed", "Fan", "Wardrobe", "Table", "Chair"];
//   const storeSingleRoomData = async (data) => {
//     try {
//       const isTokenPresent = localStorage.getItem("access-token");
//       const config = {
//         method: "post",
//         url: `http://localhost:8080/api/v1/room/${homeId}`,
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${isTokenPresent}`,
//         },
//         data,
//       };
//       const res = await axios.request(config);
//       if (res) {
//         setFormData({
//           flore: 1,
//           roomNo: "",
//           roomType: "",
//         });
//         setLgShow(false);
//       }
//     } catch (error) {
//       setError({
//         status: true,
//         msg: error.response.data.error,
//       });
//       // console.log(error)
//     }
//   };
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("user-id");
//     const formDataObj = new FormData();
//     formDataObj.append("flore", formData.flore);
//     formDataObj.append("roomNo", formData.roomNo);
//     formDataObj.append("roomType", formData.roomType);
//     formDataObj.append("facility", facility);
//     if (file) {
//       formDataObj.append("image", file);
//     }
//     if (files && files.length > 0) {
//       for (let i = 0; i < files.length; i++) {
//         formDataObj.append("multiImage", files[i]);
//       }
//     }
//     storeSingleRoomData(formDataObj);
//   };
//   const handlePhotoSelect = (evt) => {
//     setFile(evt.target.files[0]);
//   };
//   //
//   const handlePhotoSelect2 = (evt) => {
//     setFiles(evt.target.files);
//   };
//   const handleFormData = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleModla = () => {
//     setLgShow(!lgShow);
//   };
//   const handleAmenities = (ame) => {
//     const copyFacility = [...facility];
//     const index = facility.indexOf(ame);
//     if (index !== -1) {
//       copyFacility.splice(index, 1);
//     } else {
//       copyFacility.push(ame);
//     }
//     setFacility(copyFacility);
//   };
//   return (
//     <div>
//       <Container>
//         <PropertyInfo homeId={homeId} openModal={handleModla} />
//       </Container>
//       {/* insert new room data */}
//       <Modal
//         size="lg"
//         show={lgShow}
//         onHide={() => setLgShow(false)}
//         aria-labelledby="example-modal-sizes-title-lg"
//         className="custom-modal" // Add custom class to style the modal
//       >
//         <Modal.Header closeButton className="modal-header">
//           {" "}
//           {/* Add class for modal header */}
//           <Modal.Title
//             id="example-modal-sizes-title-lg"
//             className="modal-title"
//           >
//             {" "}
//             {/* Add class for modal title */}
//             Add Room details
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="modal-body">
//           {" "}
//           {/* Add class for modal body */}
//           <form
//             className="d-flex flex-column"
//             method="post"
//             encType="multipart/form-data" // Use correct attribute name
//             onSubmit={handleFormSubmit}
//           >
//             <label htmlFor="upload">Single Image</label>
//             <input
//               filename={file}
//               type="file"
//               id="upload"
//               name="upload"
//               onChange={handlePhotoSelect}
//               className="form-control" // Add class for input fields
//             />
//             <label htmlFor="uploadMultiple">Multiple Images</label>
//             <input
//               filename={files}
//               type="file"
//               id="uploadMultiple"
//               name="uploadMultiple"
//               multiple
//               onChange={handlePhotoSelect2}
//               className="form-control" // Add class for input fields
//             />
//             <input
//               type="number"
//               name="flore"
//               placeholder="No of floors"
//               value={formData.flore}
//               onChange={handleFormData}
//               className="form-control" // Add class for input fields
//             />
//             <input
//               type="text"
//               name="roomNo"
//               placeholder="Room No"
//               value={formData.roomNo}
//               onChange={handleFormData}
//               className="form-control" // Add class for input fields
//             />
//             <input
//               type="text"
//               name="roomType"
//               placeholder="Room Type"
//               value={formData.roomType}
//               onChange={handleFormData}
//               className="form-control" // Add class for input fields
//             />
//             <div className="my-3">
//               {amenities.map((amenitie, inx) => (
//                 <span
//                   className={`p-2 m-2 border rounded-2 ${
//                     facility.includes(amenitie) ? "active" : ""
//                   } `}
//                   key={inx}
//                   onClick={() => handleAmenities(amenitie)}
//                 >
//                   {amenitie}
//                 </span>
//               ))}
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>{" "}
//             {/* Add button class */}
//             {error.status && (
//               <div className="error-message">{error.msg}</div>
//             )}{" "}
//             {/* Add class for error message */}
//           </form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default PropertyDetails;

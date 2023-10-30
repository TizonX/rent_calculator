import { resolve } from "styled-jsx/css";

const propertyData = [{
    id: 1,
    image: "",
    name: "vishal Bhawan",
    desctiption: "This spacious two-bedroom apartment features a modern kitchen, ample natural light, and a private balcony with city views.",
},
{
    id: 2,
    image: "",
    name: "Jaya Kunj",
    desctiption: "The cozy cottage boasts a serene garden with a picturesque pond, perfect for relaxing weekends and outdoor gatherings",
},
{
    id: 3,
    image: "",
    name: "Mishra Niwas",
    desctiption: "",
},
]
// get all property details
export const getPropertyDetailsFakeAPI = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: propertyData
            });
        }, 3000);
    });
}
const singlePropertyData =
{
    id: 1,
    image: "",
    name: "vishal Bhawan",
    desctiption: "This spacious two-bedroom apartment features a modern kitchen, ample natural light, and a private balcony with city views.",
}
// get single property details
export const getSinglePropertyDetailsFakeAPI = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: singlePropertyData
            });
        }, 2000);
    })
}

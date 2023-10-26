const propertyData = [{
    id: 1,
    image: "",
    name: "",
    desctiption: "",
},
{
    id: 2,
    image: "",
    name: "",
    desctiption: "",
},
{
    id: 3,
    image: "",
    name: "",
    desctiption: "",
},
]
export const getPropertyDetailsFakeAPI = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: propertyData
            });
        }, 3000);
    });
}

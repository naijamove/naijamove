export type typeSchoolAndLocations = {
  id:number,
  school:string,
  destinations:string[] | []
}

export const schoolsAndDestination:typeSchoolAndLocations[] = [
{
    id:1,
  school:"LAUTECH",
  destinations:["Ibadan","Oyo"]
},
{
    id:2,
  school:"UNIILORIN",
  destinations:["Ibadan","Oyo","Ogbomosho"]
},
{
    id:3,
  school:"FUTA",
  destinations:["Ibadan","Lagos","Osogbo"]
},
{
    id:4,
  school:"FUOYE",
  destinations:[
    // Oye - ibada
    "Oye-Ekiti - Ibadan(Premium Ride)",
    "Oye-Ekiti - Ibadan(Regular Ride)",
    // Ikole - ibadan
    "Ikole - Ibadan(Premium Ride)",
    "Ikole - Ibadan(Regular Ride)",
// Oye to lagos
    "Oye - Lagos(Premium Ride)",
    "Oye - Lagos(Regular Ride)",
// ikole to lagos 
  "Ikole - Lagos(Premium Ride)",
  "Ikole - Lagos(Regular Ride)",
  ]
  // destinations:["Ibadan(Premium Ride)","Ibadan(Regular Ride)","Lagos(Premium Ride)","Lagos(Regular Ride)","Osogbo"]
},
// {
//     id:5,
//   school:"LASU",
//   destinations:[],
// },
// {
//     id:6,
//   school:"TASUED",
//   destinations:[],
// },
{
    id:7,
  school:"FUNAAB",
  destinations:["Lagos","Ibadan"],
},
{
    id:8,
  school:"OOU",
  destinations:["Lagos","Ibadan"],
},
{
    id:9,
  school:"PSSA AKURE",
  destinations:["Ibadan","OUI"],
},
// {
//     id:10,
//   school:"Ibadan(Premium-Ride)",
//   destinations:["Ikole","Oye-Ekiti"],
// },
// {
//     id:11,
//   school:"Ibadan(Regular-Ride)",
//   destinations:["Ikole","Oye-Ekiti"],
// },
// {
//     id:12,
//   school:"Lagos(Premium-Ride)",
//   destinations:["Ikole","Oye"],
// },
// {
//     id:13,
//   school:"Lagos(Regular-Ride)",
//   destinations:["Ikole","Oye"],
// },
// {
//     id:14,
//   school:"Osun",
//   destinations:["Ikole","Oye"],
// },

]
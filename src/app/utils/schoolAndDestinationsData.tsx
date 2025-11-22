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
  destinations:["Ibadan","Lagos","Osogbo"]
},
{
    id:5,
  school:"LASU",
  destinations:[],
},
{
    id:6,
  school:"TASUED",
  destinations:[],
},
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

]
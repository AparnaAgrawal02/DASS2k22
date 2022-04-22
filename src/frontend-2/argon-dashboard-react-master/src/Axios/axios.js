
import axios from "axios";
axios.defaults.withCredentials = true
export async function getAllverifiedActivities() {
  let list = []
  var res = axios
    .get("http://localhost:5000/user/getallverifieda")
    .then((response) => {
      list = response.data.activities
      console.log(response)
    })
  return list
}
export async function getAllverifiedProjects() {
  let list = []
  var res = await axios
    .get("http://localhost:5000/user/getallverifiedp")
    .then((response) => {
      list = response.data.projects;
      console.log(response)
    })

  return list
}
export async function getAllverifiedData() {
  let list = []
  var res = await axios
    .get("http://localhost:5000/user/getallverifiedd")
    .then((response) => {
      list = response.data.data;
      console.log(response)
    })

  return list
}
export async function getAllUnverifiedData() {
  let list = []
  var res = await axios
    .get("http://localhost:5000/admin/unverifiedd")
    .then((response) => {
      list = response.data.data
    })
  return list
}
export async function getAllUnverifiedActivities() {
  let list = []
  var res = await axios
    .get("http://localhost:5000/admin/unverifieda")
    .then((response) => {
      list = response.data.activities
    })
  return list
}
export async function getAllUnverifiedProjects() {
  let list = []
  var res = await axios
    .get("http://localhost:5000/admin/unverifiedp")
    .then((response) => {
      list = response.data.projects
    })
  return list
}

export function veriData(id) {
  let res = 0
  axios
    .put(`http://localhost:5000/admin/verifyd/${id}`)
    .then((response) => {
      res = 1
    })
    .catch(error => {
      res = 0
    })
  return res

}
export async function veriProjects(id) {
  return axios
    .put(`http://localhost:5000/admin/verifyp/${id}`)

}
export function veriActivity(id) {
  return axios
    .put(`http://localhost:5000/admin/verifya/${id}`)
}



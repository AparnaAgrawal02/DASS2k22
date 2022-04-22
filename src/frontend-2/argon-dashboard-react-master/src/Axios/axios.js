
import axios from "axios";
export async function getAllverifiedActivities() {
  let list = []
  var res = axios
    .get("http://localhost:4000/user/getallverifieda")
    .then((response) => {
      list = response.data.activities
      console.log(response)
    })
  return list
}
export async function getAllverifiedProjects() {
  let list = []
  var res = await axios
    .get("http://localhost:4000/user/getallverifiedp")
    .then((response) => {
      list = response.data.projects;
      console.log(response)
    })

  return list
}
export async function getAllverifiedData() {
  let list = []
  var res = await axios
    .get("http://localhost:4000/user/getallverifiedd")
    .then((response) => {
      list = response.data.data;
      console.log(response)
    })

  return list
}
export async function getAllUnverifiedData() {
  let list = []
  var res = await axios
    .get("http://localhost:4000/admin/unverifiedd")
    .then((response) => {
      list = response.data.data
    })
  return list
}
export async function getAllUnverifiedActivities() {
  let list = []
  var res = await axios
    .get("http://localhost:4000/admin/unverifieda")
    .then((response) => {
      list = response.data.activities
    })
  return list
}
export async function getAllUnverifiedProjects() {
  let list = []
  var res = await axios
    .get("http://localhost:4000/admin/unverifiedp")
    .then((response) => {
      list = response.data.projects
    })
  return list
}

export function deleteActivity(id) {
  let res = 0
  axios
    .delete(`http://localhost:4000/admin/deleteactivity/${id}`)
    .then((response) => {
      res = 1
    })
    .catch(error => {
      res = 0
    })
  return res

}

export function deleteProject(id) {
  let res = 0
  axios
    .delete(`http://localhost:4000/admin/deleteproject/${id}`)
    .then((response) => {
      res = 1
    })
    .catch(error => {
      res = 0
    })
  return res
}


export function deleteData(id) {
  let res = 0
  axios
    .delete(`http://localhost:4000/admin/deletedata/${id}`)
    .then((response) => {
      res = 1
    })
    .catch(error => {
      res = 0
    })
  return res

}




export function veriData(id) {
  let res = 0
  axios
    .put(`http://localhost:4000/admin/verifyd/${id}`)
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
    .put(`http://localhost:4000/admin/verifyp/${id}`)

}
export function veriActivity(id) {
  return axios
    .put(`http://localhost:4000/admin/verifya/${id}`)
}



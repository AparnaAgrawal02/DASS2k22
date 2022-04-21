export async function getAllverifiedActivities() {
    list=[]
    var res = axios
      .get("http://localhost:5000/user/getallverifieda")
      .then((response) => {
        list = response.data.activities
        console.log(response)
      })
    return list
  }
 export async function getAllverifiedProjects() {
      list = []
    var res = await axios
      .get("http://localhost:5000/user/getallverifiedp")
      .then((response) => {
        list = response.data.projects;
        console.log(response)
      })

    return list
  }
  export async function getAllverifiedProjects() {
    list = []
  var res = await axios
    .get("http://localhost:5000/user/getallverifiedd")
    .then((response) => {
      list = response.data.projects;
      console.log(response)
    })

  return list
}
 export async function getAllUnverifiedData() {
      list =[]
    var res = await axios
      .get("http://localhost:5000/admin/unverifiedd")
      .then((response) => {
        list = response.data.data
      })
    return list
  }
 export async function getAllUnverifiedActivities() {
    list =[]
  var res = await axios
    .get("http://localhost:5000/admin/unverifieda")
    .then((response) => {
      list = response.data.data
    })
  return list
}
export async function getAllUnverifiedProjects() {
    list =[]
  var res = await axios
    .get("http://localhost:5000/admin/unverifiedp")
    .then((response) => {
      list = response.data.data
    })
  return list
}
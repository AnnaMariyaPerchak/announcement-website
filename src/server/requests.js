
export function getAllAnnouncement(url) {
  // let temp = [];
  return fetch(url,{method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      return data
      // localStorage.setItem('data',JSON.stringify(data))
      // for (let i = 0; i < data.length; i++) {
      //   temp.push(data[i]);
      // }
    })
    .catch(error => {
      console.error(error);
  });
  // return temp;
};

export function deleteAnnouncement(url,item) {
  return fetch(url,{method:"DELETE",body:item}).then(response => {response.json()})

}

export function editAnnouncement(url,announcement){
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(announcement),
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result
    });
}

export function createAnnouncement(url, announcement){
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ title: 'React POST Request Example' })
    body: JSON.stringify(announcement),
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
    
}

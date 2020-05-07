async function getLaunches() {
  const res = await axios.get(
    "https://api.spacexdata.com/v3/capsules/upcoming"
  );
  const ul = document.querySelector("#launches");
  for (let launch of res.data) {
      const newLi = document.createElement('li');
      newLi.innerText = launch.capsule_id;
      ul.append(newLi);
      console.log(launch.capsule_id);
  }
}

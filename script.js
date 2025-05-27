const visitList = [
  {
    name: "The Johnson Family",
    address: "123 Maple Street, Springfield, IL"
  },
  {
    name: "The Smith Family",
    address: "456 Oak Avenue, Lincoln, NE"
  }
];

const ul = document.getElementById("visit-list");

visitList.forEach(entry => {
  const li = document.createElement("li");

  const link = document.createElement("a");
  link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(entry.address)}`;
  link.target = "_blank";
  link.textContent = `${entry.name} - ${entry.address}`;

  li.appendChild(link);
  ul.appendChild(li);
});

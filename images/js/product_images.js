const portfolioImages = [
  { id: "11LRxtqg9V40kgn8gyFDVISJ29NMdXkYW", title: "Product 1", group: "perfume"  },
  { id: "12JfQ02J_lbi8Fx33QQoTfN6BGUBHWbx0", title: "Product 2", group: "watch"  },
  { id: "13rlXDfyT_KkplkF4C4mEIwa-9txwtstv", title: "Product 3", group: "jewellery"  },
  { id: "15w-MzROlZmLkSm4BfbHblfhoJY6QM5Q0", title: "Product 4", group:"shoes" },
  { id: "168iBHqZZvbkrwbEViVxne2-mYrmgfDFs", title: "Product 5", group: "perfume"},
  { id: "18pJ_kpRmI5csHh-D6rDkGseYkBovOc_J", title: "Product 6", group: "watch"},
  { id: "18yap8Wfu3zHyS9VZ0vPSRiuor1QgZrZg", title: "Product 7", group: "jewellery" },
  { id: "1AKcBeJol2vVa5NFNOKkk7cOADfqAbWHD", title: "Product 8", group: "shoes" },
  { id: "1CiRjIXCLP53Of7vRPJQwPQB3kGi6VWJa", title: "Product 9" },
  { id: "1EkH6l1UmWAk9THDSKfZMNjrFIXa7qXkz", title: "Product 10" },
  { id: "1FMgwBVcagrcKstbPDT6cshqs2YcP9N8o", title: "Product 11" },
  { id: "1Fkc_ii4TI24Q4k3kHYltHfh6SzHhsOzn", title: "Product 12" },
  { id: "1HNezpLNBctqZapijhKKcHWthd2iRnwlt", title: "Product 13" },
  { id: "1K3a8EVZnHRqGMQ94mHOf8nfw4k8wTnz8", title: "Product 14" },
  { id: "1MdW3UPqxK0UkWWC2hoP0GtxiBIQdGxro", title: "Product 15" },
  { id: "1Uwpue9t70IH3-QpeXpKohgE9wCtWdXf3", title: "Product 16" },
  { id: "1ZaECHgBo5zVgmOQGKCZnc4VydD35UkV2", title: "Product 17" },
  { id: "1bAVHr6fbWj_AdRaeGEzLO4rZwnm5q35k", title: "Product 18" },
  { id: "1bX6PFSqezJHHibYG5MD7sE7Q0yFOUesp", title: "Product 19" },
  { id: "1glnbHRY9g3bH7HJKoxXQDA9njbz9aRTg", title: "Product 20" },
  { id: "1hS9ZVD2Ijp5m8rvXFVREo5IjhgrSsASv", title: "Product 21" },
  { id: "1hdzu0OTdhTVTzwVjz2qyrqZPGA3uKzqi", title: "Product 22" },
  { id: "1jN2STWCut_DwM_1rO9kLebO_3wC0wX2l", title: "Product 23" },
  { id: "1ktiOEIECVQzhf4xYYx56QL_q0xK72lP8", title: "Product 24" },
  { id: "1mw6fkvMOBqOMfNZ9DcTMUgpaE4DmEAuq", title: "Product 25" },
  { id: "1nJZOigcORzd1G3-2mDJiEvD5RXXJ7An-", title: "Product 26" },
  { id: "1z87ogPIfsH8-WuiNeZSJ2akGmTgIgv51", title: "Product 27" },
  { id: "1z_zvhkW8qauwj1cZTHaMfiiscjXaWpJS", title: "Product 28" },
];


const portfolioExtraImages = {
  perfume: [
    { id: "12JfQ02J_lbi8Fx33QQoTfN6BGUBHWbx0", title: "Perfume Extra 1" },
    // { id: "13rlXDfyT_KkplkF4C4mEIwa-9txwtstv", title: "Perfume Extra 2" }
  ],
  watch: [
    { id: "168iBHqZZvbkrwbEViVxne2-mYrmgfDFs", title: "Watch Extra 1" },
    // { id: "18pJ_kpRmI5csHh-D6rDkGseYkBovOc_J", title: "Watch Extra 2" }
  ],
  jewellery: [
    { id: "1AKcBeJol2vVa5NFNOKkk7cOADfqAbWHD", title: "Jewellery Extra 1" },
    // { id: "1CiRjIXCLP53Of7vRPJQwPQB3kGi6VWJa", title: "Jewellery Extra 2" }
  ],
  shoes: [
    { id: "1D8eiH3cKaGyioJZP0HkQjZt34KbaqgLQ", title: "Shoes Extra 1" },
    // { id: "1E2z4xvT6YhZ7YkPbPnGyqBb6Qq7AQ8eZ", title: "Shoes Extra 2" }
  ],
  // bags: [
  //   { id: "1FjJtVwX7E6qmrB8HV6HhF8s6mG4aD8LQ", title: "Bags Extra 1" },
  //   { id: "1G7b3fFb8Q2hrwqYjK9sPpFxwT6aV5EJz", title: "Bags Extra 2" }
  // ]
  // Add more extras under the correct group
};

// const portfolioImages = [
//   { id: "11LRxtqg9V40kgn8gyFDVISJ29NMdXkYW", title: "Perfume 1", group: "set1" },
//   { id: "12JfQ02J_lbi8Fx33QQoTfN6BGUBHWbx0", title: "Perfume 2", group: "set1" },
//   { id: "13rlXDfyT_KkplkF4C4mEIwa-9txwtstv", title: "Perfume 3", group: "set1" },

//   { id: "15w-MzROlZmLkSm4BfbHblfhoJY6QM5Q0", title: "Watch 1", group: "set2" },
//   { id: "168iBHqZZvbkrwbEViVxne2-mYrmgfDFs", title: "Watch 2", group: "set2" },
//   { id: "18pJ_kpRmI5csHh-D6rDkGseYkBovOc_J", title: "Watch 3", group: "set2" },

//   // keep adding manually...
// ];

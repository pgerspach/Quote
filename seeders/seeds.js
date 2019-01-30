module.exports = db => {
  const uuids_placeholder = ['23','54','12364','123','542'];
  const names = ["Jack Sparrow", "Andy Dufresne", "Yogi Berra","Abraham Lincoln","Jerry Seinfeld"];
  const quotes = [
    "The problem is not the problem. The problem is your attitude about the problem",
    "Get busy living or get busy dying",
    "When you come to a fork in the road, take it",
    "Give me six hours to chop down a tree and I will spend the first four sharpening the axe",
    "A bookstore is one of the only pieces of physical evidence we have that people are still thinking."
  ];
  const inflections = [null, null, null,null, null];

  createInitialUsers(names, uuids_placeholder);

  function createInitialUsers(namesLeft, uuids_placeholder) {
    let namesCopy = namesLeft.slice(0);
    let uuids_placeholderCopy = uuids_placeholder.slice(0);
    if (namesCopy.length > 0) {
      db.Users.create({
        name: namesCopy.pop(),
        id:uuids_placeholderCopy.pop()
      })
        .then(result => {
          console.log("successfully created user: " + result);
          createInitialUsers(namesCopy, uuids_placeholderCopy);
          return;
        })
        .catch(err => {
          if (err) throw err;
        });
    }else{
      createInitialQuotes(quotes, names);

        return;
    }
  }

  function createInitialQuotes(quotes, namesLeft) {
    // let quotesCopy = quotes.slice(0);
    let namesCopy = namesLeft.slice(0);
    if (quotes.length > 0) {
      db.Users.findAll({
        attributes: ["id"],
        where: {
          name: namesCopy[namesCopy.length - 1]
        }
      })
        .then(result => {

          db.Quotes.create({
            quote_speaker: namesCopy.pop(),
            UserId: result[0].id,
            quote_body: quotes.pop(),
            inflection:
              inflections[quotes.length] //Math.floor(inflections.length * Math.random())
          })
            .then(result => {
              console.log("successfully created quote: " + result);
              createInitialQuotes(quotes, namesCopy);
              return;
            })
            .catch(err => {
              if (err) throw err;
            });
        })
        .catch(err => {
          if (err) throw err;
        });
    }else{
      addFriendships(uuids_placeholder);
    }
  }

  function addFriendships(uuids_placeholder){
    let uuids_placeholderCopy = uuids_placeholder.slice(0);
    db.Friendship.create({
      uuid_1: uuids_placeholderCopy[0],
      uuid_2: uuids_placeholderCopy[1],
      status:2
    }).then((result)=>{
      console.log("successfully created friendship: " + result);
    })
  }
};

import React, {useState, useEffect} from "react";

const List = () => {
  // Create the hook
  const [listItems, setListItems] = useState(Array.from(Array(30).keys(), n => n+1));
  const[isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
    {
        return
    }
    // console.log("2. Fetch more list items...");
    setIsFetching(true);
};

    const fetchMoreListItems = () => {
        setTimeout(() => {
            setListItems(prevState => ([...prevState, ...Array.from(Array(20).keys(), n => n + prevState.length + 1)]));
            setIsFetching(false);
          }, 2000);
    ;}

    useEffect(() => {
        // console.log("1. UseEffect is running...")
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {

        if (!isFetching){
            return
        }
        // console.log("Fetching state is changed! =>", isFetching)
        fetchMoreListItems()

    }, [isFetching])

  return (
  <>
    <ul className="list-group mb-2">
      {listItems.map(listItem => <div key={listItem}><li className="list-group-item">This is List Item - {listItem}</li></div>)}
    </ul>
  </>
  )
}

export default List
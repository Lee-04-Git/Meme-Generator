import React from "react";

// The Meme component handles the creation and display of memes
export default function Meme() {
     // State to store the current meme's text and image
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    // State to store the list of all available meme images
    const [allMemes, setAllMemes] = React.useState([])

    // useEffect to fetch meme data from an API when the component loads
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes();
    }, []) // Empty dependency array ensures this runs only once when the component mounts

    // Function to select a random meme image from the list
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url // Get the URL of the random meme
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url // Update the image URL
        }))     
    }

     // Function to update meme text based on input changes
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,    // Keep existing state values
            [name]: value  // Dynamically update topText or bottomText based on the input's name
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}
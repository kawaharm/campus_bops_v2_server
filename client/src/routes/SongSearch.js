import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolFinder from '../api/SchoolFinder';
import SongFinder from '../api/SongFinder';
import CategoryFinder from '../api/CategoryFinder';
import { SchoolsContext } from '../context/CampusContext';

function SongSearch() {
    const [title, setTitle] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const { selectedCategory, setSelectedCategory } = useContext(SchoolsContext);
    const { schools, setSchools } = useContext(SchoolsContext);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get all schools from server
                const response = await SchoolFinder.get("/")
                // Store school list in state
                setSchools(response.data.data.schools);
            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
    }, [])


    const handleSongSearch = async (e) => {
        e.preventDefault();
        try {
            const searchedSong = await SongFinder.post(`/search`, {
                title,
            })
            console.log(searchedSong.data.song)
            setSearchResults(searchedSong.data.song);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSchoolSelect = async (id) => {
        try {
            const selectedSchool = await SchoolFinder.get(`/${id}`);
            setCategories(selectedSchool.data.categories);

        } catch (err) {
            console.log(err)
        }
    }

    const handleAddSongToCategory = async (e, id) => {
        e.stopPropagation();
        try {
            const newSong = await CategoryFinder.post(`/${id}/addSong`, {
                title: selectedSong.title,
                artist: selectedSong.artist,
                album: selectedSong.album,
                albumCover: selectedSong.albumCover,
                songPlayerId: selectedSong.songPlayerId
            });
            // Navigate to category page
            navigate(`/categories/${id}`);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form>
                <div class="form-group">
                    <label for="songTitle">Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                        id="songTitle"
                        placeholder="Search Song" />
                </div>
                <button
                    onClick={handleSongSearch}
                    type="submit"
                    className="btn btn-primary">Search</button>
            </form>
            <div className="row row-cols-3 mb-2">
                {searchResults && searchResults.map((result, index, resultArray) => {
                    return (
                        <div
                            key={result.id}
                            className="card text-white bg-success my-3 me-4"
                            style={{ maxWidth: "30%" }}>
                            <img className="card-img-top my-3" src={result.albumCover} alt="album cover" />
                            <div className="card-body">
                                <h3 className="card-title">Title: {result.title}</h3>
                                <h5 className="card-title">Artist: {result.artist}</h5>
                                <h5 className="card-text">Album: {result.album}</h5>
                                <div className="card-title">
                                    <iframe
                                        src={`https://open.spotify.com/embed/track/${result.songPlayerId}`}
                                        width="300"
                                        height="80"
                                        frameborder="0"
                                        allowtransparency="true"
                                        allow="encrypted-media" />
                                </div>
                                <button
                                    onClick={() => { setSelectedSong(result) }}
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    Add To Category
                                </button>

                                {/* Add To Category Modal */}
                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title text-dark" id="exampleModalLabel">Select Category</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {/* Dropdown for School */}
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Select School
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        {schools && schools.map(school => {
                                                            return (
                                                                <li
                                                                    key={school.id}
                                                                    onClick={() => handleSchoolSelect(school.id)}
                                                                    className="dropdown-item"
                                                                    style={{ cursor: "pointer" }}
                                                                >{school.name}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="row row-cols-4 my-4">
                                                    {categories && categories.map(category => {
                                                        return (
                                                            <button
                                                                key={category.id}
                                                                onClick={(e) => handleAddSongToCategory(e, category.id)}
                                                                className="btn btn-primary mb-3 mx-2"
                                                                type="button"
                                                            >{category.name}</button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default SongSearch;
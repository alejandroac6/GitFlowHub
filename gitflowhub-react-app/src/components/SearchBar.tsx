import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuggestionList from "./SuggestionList";

interface SearchBarProps {
  onUserSearchChange: (user: string) => void;
  onRepoSearchChange: (repo: string) => void;
  onTitleSearchChange: (title: string) => void;
  username: string;
  avatar_url: string;
  userSuggestions: string[];
  repoSuggestions: string[];
  titleSuggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onUserSearchChange,
  onRepoSearchChange,
  onTitleSearchChange,
  username,
  avatar_url,
  userSuggestions,
  repoSuggestions,
  titleSuggestions,
}) => {
  const [searchUser, setSearchUser] = useState("");
  const [searchRepo, setSearchRepo] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  
  const [filteredUserSuggestions, setFilteredUserSuggestions] = useState<string[]>(userSuggestions);
  const [filteredRepoSuggestions, setFilteredRepoSuggestions] = useState<string[]>(repoSuggestions);
  const [filteredTitleSuggestions, setFilteredTitleSuggestions] = useState<string[]>(titleSuggestions);

  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [showRepoSuggestions, setShowRepoSuggestions] = useState(false);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/my-board");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.closest('.input-field')) {
        setShowUserSuggestions(event.target.placeholder === "Search by user");
        setShowRepoSuggestions(event.target.placeholder === "Search by repository");
        setShowTitleSuggestions(event.target.placeholder === "Search by PR title");
        return;
      }

      setShowUserSuggestions(false);
      setShowRepoSuggestions(false);
      setShowTitleSuggestions(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFilteredUserSuggestions(userSuggestions);
    setFilteredRepoSuggestions(repoSuggestions);
    setFilteredTitleSuggestions(titleSuggestions);
  }, [userSuggestions, repoSuggestions, titleSuggestions]);  

  return (
    <div className="flex justify-end">
      <div className="search-bar">
        <div className="input-with-icon">
          <input
            className="input-field"
            type="text"
            placeholder="Search by user"
            value={searchUser}
            onChange={(e) => {
              const inputVal = e.target.value;
              setSearchUser(inputVal);
              const filteredUsers = userSuggestions.filter(user => 
                inputVal ? user.toLowerCase().includes(inputVal.toLowerCase()) : true);
              setFilteredUserSuggestions(filteredUsers);
              onUserSearchChange(inputVal);
            }}
            onClick={() => {
              setShowUserSuggestions(true);
              setShowRepoSuggestions(false);
              setShowTitleSuggestions(false);
            }}
          />
          <i className="fas fa-search"></i>
          {showUserSuggestions && <SuggestionList items={filteredUserSuggestions} onSuggestionClick={(item) => { setSearchUser(item); onUserSearchChange(item); setShowUserSuggestions(false); }} />}
        </div>

        <div className="input-with-icon">
          <input
            className="input-field"
            type="text"
            placeholder="Search by repository"
            value={searchRepo}
            onChange={(e) => {
              const inputVal = e.target.value;
              setSearchRepo(inputVal);
              const filteredRepos = repoSuggestions.filter(repo => 
                inputVal ? repo.toLowerCase().includes(inputVal.toLowerCase()) : true);
              setFilteredRepoSuggestions(filteredRepos);
              onRepoSearchChange(inputVal);
            }}
            onClick={() => {
              setShowRepoSuggestions(true);
              setShowUserSuggestions(false);
              setShowTitleSuggestions(false);
            }}
          />
          <i className="fas fa-search"></i>
          {showRepoSuggestions && <SuggestionList items={filteredRepoSuggestions} onSuggestionClick={(item) => { setSearchRepo(item); onRepoSearchChange(item); setShowRepoSuggestions(false); }} />}
        </div>

        <div className="input-with-icon">
          <input
            className="input-field"
            type="text"
            placeholder="Search by PR title"
            value={searchTitle}
            onChange={(e) => {
              const inputVal = e.target.value;
              setSearchTitle(inputVal);
              const filteredTitles = titleSuggestions.filter(title => 
                inputVal ? title.toLowerCase().includes(inputVal.toLowerCase()) : true);
              setFilteredTitleSuggestions(filteredTitles);
              onTitleSearchChange(inputVal);
            }}
            onClick={() => {
              setShowTitleSuggestions(true);
              setShowRepoSuggestions(false);
              setShowUserSuggestions(false);
            }}
          />
          <i className="fas fa-search"></i>
          {showTitleSuggestions && <SuggestionList items={filteredTitleSuggestions} onSuggestionClick={(item) => { setSearchTitle(item); onTitleSearchChange(item); setShowTitleSuggestions(false); }} />}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;


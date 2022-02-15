import { createContext, useState } from "react";

const ContentContext = createContext({
  content: "",
  search: "",
  changeSearch: () => {},
  changeContent: () => {},
});

export const ContentContextProvider = (props) => {
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const contentChangeHandler = (content) => {
    setContent(content);
  };

  const searchChangeHandler = (search) => {
    setSearch(search);
  };

  const contextValue = {
    content: content,
    changeContent: contentChangeHandler,
    search: search,
    changeSearch: searchChangeHandler,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {props.children}
    </ContentContext.Provider>
  );
};

export default ContentContext;

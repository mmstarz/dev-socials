export let postForm = {
  text: {
    elementName: "textarea",
    elementBody: {
      name: "text",
      type: "text",
      value: "",
      placeholder: "Your text",
      required: true,
      cols: "33",
      rows: "5",
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "new post",
    error: {
      msg: "",
    },
  },
};

export const clearPostForm = () => {
  postForm = {
    text: {
      elementName: "textarea",
      elementBody: {
        name: "text",
        type: "text",
        value: "",
        placeholder: "Your text",
        required: true,
        cols: "33",
        rows: "5",
      },
      options: {
        valid: false,
        touched: false,
        typed: false,
      },
      info: "New Post",
      error: {
        msg: "",
      },
    },
  };  
};

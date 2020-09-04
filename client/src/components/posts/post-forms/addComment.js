export let commentForm = {
  text: {
    elementName: "textarea",
    elementBody: {
      name: "text",
      type: "text",
      value: "",
      placeholder: "Leave your comment please",
      required: true,
      cols: "33",
      rows: "5",
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "comment",
    error: {
      msg: "",
    },
  },
};

export const clearCommentForm = () => {
  commentForm = {
    text: {
      elementName: "textarea",
      elementBody: {
        name: "text",
        type: "text",
        value: "",
        placeholder: "Leave your comment please",
        required: true,
        cols: "33",
        rows: "5",
      },
      options: {
        valid: false,
        touched: false,
        typed: false,
      },
      info: "comment",
      error: {
        msg: "",
      },
    },
  };  
};

const LinkReadonly = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <a href={url} className="text-blue-600 underline underline-offset-1 cursor-pointer" title={url}>
      {props.children}
    </a>
  );
};

export default LinkReadonly;

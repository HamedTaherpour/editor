interface Props {
  open: boolean;
  posX: number;
  posY: number;
}

const AppContextMenu = (props: Props) => {
  const { posX, posY, open } = props;

  return open ? (
    <div
      style={{ left: posX, top: posY }}
      className="w-52 h-52 bg-red-500 rounded absolute"
    >
      {posX}
    </div>
  ) : null;
};

export default AppContextMenu;

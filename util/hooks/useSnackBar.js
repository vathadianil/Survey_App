import { useState } from "react";

const useSnackBar = () => {
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return {
    visible,
    onToggleSnackBar,
    onDismissSnackBar,
  };
};

export default useSnackBar;

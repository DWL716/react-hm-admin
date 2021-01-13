import React, {memo} from 'react';

interface IProps {

}

const User: React.FC<IProps> = (props) => {

  return (
    <div>
      用户管理
    </div>
  );
};

export default memo(User);
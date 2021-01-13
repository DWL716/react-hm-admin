import React, {memo} from 'react';

interface IProps {

}

const System: React.FC<IProps> = (props) => {

  return (
    <div>
      系统管理
    </div>
  );
};

export default memo(System);
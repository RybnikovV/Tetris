import { FC } from "react";
import classNames from "classnames";
import "./tabs.scss";

interface TabItem {
  label: string;
  disabled?: boolean;
  selected?: boolean;
  id: string;
};

interface TabsProps {
  label?: string;
  disabled?: boolean;
  onChange?: () => void;
  tabs: TabItem[];
};

const Tabs: FC<TabsProps> = ({
  disabled,
  label,
  onChange,
  tabs,
}) => {
  const classTabs = classNames('tabs', {'tabs_disabled': disabled});
  const classTab = classNames('tab');

  return (
    <>
      <div className={classTabs}>
        {tabs.map((i) => {
          return <div key={i.id} className={classTab}>
            {i.label}
          </div>
        })}
      </div>
    </>
  )
}

export default Tabs
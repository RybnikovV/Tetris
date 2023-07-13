import { Tabs } from '../shared/UIkit';

function Index() {
  const tabsData = [
    {
      label: "name of tab 1",
      id: 'tab1'
    },     {
      label: "name of tab 2",
      id: 'tab2'
    },     {
      label: "name of tab 3",
      id: 'tab3'
    },
  ];

  return (
    <Tabs tabs={tabsData}/>
  )
}

export default Index
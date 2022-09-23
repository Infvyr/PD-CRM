import { Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { namedComponent } from '../../../../config/dynamic-component';
import { StyledTabs } from './Overview.styles';

const Dynamic = {
	DriverSummary: dynamic(() => namedComponent(import('./Summary'), 'Summary'), {
		ssr: false
	}),
	DriverVanCheck: dynamic(
		() => namedComponent(import('./VanCheck'), 'VanCheck'),
		{ ssr: false }
	),
	LoadTasks: dynamic(() => namedComponent(import('./LoadTasks'), 'LoadTasks'), {
		ssr: false
	}),
	UnloadTasks: dynamic(
		() => namedComponent(import('./UnloadTasks'), 'UnloadTasks'),
		{ ssr: false }
	),
	Tasks: dynamic(() => namedComponent(import('./Tasks'), 'Tasks'), {
		ssr: false
	})
};

export const DriverActivityOverview: FC = (): JSX.Element => (
	<StyledTabs defaultActiveKey="summary" type="card">
		<Tabs.TabPane tab="Summary" key="summary">
			<Dynamic.DriverSummary />
		</Tabs.TabPane>
		<Tabs.TabPane tab="Van Check" key="van-check">
			<Dynamic.DriverVanCheck />
		</Tabs.TabPane>
		<Tabs.TabPane tab="Load Tasks" key="load-tasks">
			<Dynamic.LoadTasks />
		</Tabs.TabPane>
		<Tabs.TabPane tab="Tasks" key="tasks">
			<Dynamic.Tasks />
		</Tabs.TabPane>
		<Tabs.TabPane tab="Unload Tasks" key="unload-tasks">
			<Dynamic.UnloadTasks />
		</Tabs.TabPane>
	</StyledTabs>
);

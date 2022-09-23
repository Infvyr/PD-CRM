import { Button, Card, Col, DatePicker, Space, Tabs, Typography } from 'antd';
import DriverActivityContext from '../../modules/drivers/context/DriverActivity.context';
import moment from 'moment';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, CustomPageHeader, Spinner } from '../../components';
import CustomHead from '../../components/Head';
import { DATE_PICKER_FORMAT } from '../../config/date-format';
import { namedComponent } from '../../config/dynamic-component';
import {
	StyledTabs,
	StyledCard,
	StyledRow
} from '../../modules/drivers/activity-report/Overview/Overview.styles';
import { useDriver } from '../../modules/drivers/hooks/useDrivers';

const Dynamic = {
	DriverSummary: dynamic(
		() =>
			namedComponent(
				import('../../modules/drivers/activity-report/Overview/Summary'),
				'Summary'
			),
		{
			loading: () => <Spinner />
		}
	),
	DriverVanCheck: dynamic(
		() =>
			namedComponent(
				import('../../modules/drivers/activity-report/Overview/VanCheck'),
				'VanCheck'
			),
		{ loading: () => <Spinner /> }
	),
	LoadTasks: dynamic(
		() =>
			namedComponent(
				import('../../modules/drivers/activity-report/Overview/LoadTasks'),
				'LoadTasks'
			),
		{
			ssr: false
		}
	),
	UnloadTasks: dynamic(
		() =>
			namedComponent(
				import('../../modules/drivers/activity-report/Overview/UnloadTasks'),
				'UnloadTasks'
			),
		{ ssr: false }
	),
	Tasks: dynamic(
		() =>
			namedComponent(
				import('../../modules/drivers/activity-report/Overview/Tasks'),
				'Tasks'
			),
		{
			ssr: false
		}
	),
	DriverKarma: dynamic(
		() =>
			namedComponent(
				import('../../modules/drivers/karma/DriverKarma'),
				'DriverKarma'
			),
		{
			ssr: false
		}
	),

	ResultError: dynamic(
		() => namedComponent(import('../../components'), 'ResultError'),
		{
			ssr: false
		}
	)
};

function DriverSinglePage() {
	const [tabExtraContent, setTabExtraContent] = useState<boolean>(false);
	const [date, setDate] = useState<moment.Moment>();

	const router = useRouter();
	const driverId = router.query.driverID as string | undefined;
	const queryActiveTab = router.query.activeTab as string;
	const { error, loading } = useDriver(driverId);

	const pushToUrlByTabKey = (tabKey: string) =>
		window.history.replaceState(
			null,
			'',
			`/drivers/${driverId}?activeTab=${tabKey}`
		);

	const handleTabClick = (key: string) => {
		key === 'karma' ? setTabExtraContent(false) : setTabExtraContent(true);
		pushToUrlByTabKey(key);
	};

	if (!driverId || loading) return <Spinner />;

	if (error)
		return (
			<Dynamic.ResultError
				error={error}
				style={{ height: '100vh' }}
				extra={
					<Link href="/drivers/activity-report" passHref>
						<Button type="primary">Back to drivers</Button>
					</Link>
				}
			/>
		);

	return (
		<>
			<CustomHead title="Driver page" />
			<CustomPageHeader
				title="Drivers Activity"
				url="/drivers/activity-report"
			/>
			<DriverActivityContext.Provider
				value={{ id: +driverId, selectedDate: moment(date) }}
			>
				<Container>
					<StyledRow gutter={[24, 24]}>
						<Col xs={24}>
							<StyledCard>
								<Dynamic.DriverSummary />
							</StyledCard>
						</Col>
						<Col xs={24}>
							<Card>
								<StyledTabs
									defaultActiveKey={queryActiveTab}
									type="card"
									onTabClick={(key: string) => handleTabClick(key)}
									tabBarExtraContent={
										tabExtraContent && (
											<Space size="middle">
												<Typography.Text>Filter by: </Typography.Text>
												<DatePicker
													onSelect={(value: moment.Moment) => setDate(value)}
													format={DATE_PICKER_FORMAT}
													placeholder="selected date"
													defaultValue={moment()}
												/>
											</Space>
										)
									}
								>
									<Tabs.TabPane tab="Van Check" key="van-check">
										<Dynamic.DriverVanCheck />
									</Tabs.TabPane>
									<Tabs.TabPane tab="Load Tasks" key="load-tasks">
										<Dynamic.LoadTasks />
									</Tabs.TabPane>
									<Tabs.TabPane tab="Unload Tasks" key="unload-tasks">
										{<Dynamic.UnloadTasks />}
									</Tabs.TabPane>
									<Tabs.TabPane tab="Tasks" key="tasks">
										{<Dynamic.Tasks />}
									</Tabs.TabPane>
									<Tabs.TabPane tab="Karma" key="karma">
										{<Dynamic.DriverKarma />}
									</Tabs.TabPane>
								</StyledTabs>
							</Card>
						</Col>
					</StyledRow>
				</Container>
			</DriverActivityContext.Provider>
		</>
	);
}

export default DriverSinglePage;

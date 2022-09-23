import { Button, Modal } from 'antd';
import { CSSProperties, FC, Fragment, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import { StyledPageHeader } from './CustomPageHeader.styles';

type Props = {
	url?: string;
	title: string;
	extra?: ReactNode;
	hasChanges?: boolean;
	backIcon?: ReactNode | boolean;
	style?: CSSProperties;
};

export const CustomPageHeader: FC<Props> = ({
	url,
	title,
	extra,
	backIcon,
	style,
	hasChanges
}: Props): JSX.Element => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const router = useRouter();

	const handleOnBack = () => (url ? router.push(url) : router.back());

	return (
		<StyledPageHeader
			backIcon={backIcon}
			onBack={() => (hasChanges ? setShowModal(true) : handleOnBack())}
			title={title}
			extra={extra}
			style={style}
		>
			{hasChanges && (
				<Modal
					width={440}
					bodyStyle={{ paddingTop: '2rem', paddingBottom: '0.5rem' }}
					maskClosable={false}
					visible={showModal}
					onCancel={() => setShowModal(false)}
					footer={[
						<Fragment key="back-to">
							<Button htmlType="button" key="leave" onClick={handleOnBack}>
								Leave
							</Button>
							<Button
								htmlType="button"
								type="primary"
								key="stay"
								onClick={() => setShowModal(false)}
							>
								Stay
							</Button>
						</Fragment>
					]}
				>
					<h3>Do you want to leave this page?</h3>
					<p>Changes you have made may not be saved.</p>
				</Modal>
			)}
		</StyledPageHeader>
	);
};

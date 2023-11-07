"use client"

import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	styled,
} from "@mui/material"

import { Constants } from "@spp/constants/constants"

import Image from "next/image"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

import HomeIcon from "@spp/icons/sidebar-icons/home.svg"
import TaskIcon from "@spp/icons/sidebar-icons/task.svg"
import DepositIcon from "@spp/icons/sidebar-icons/deposit.svg"
import WithdrawalIcon from "@spp/icons/sidebar-icons/withdrawal.svg"
import CustomerIcon from "@spp/icons/sidebar-icons/customer.svg"
import UserIcon from "@spp/icons/sidebar-icons/user.svg"
import MailboxIcon from "@spp/icons/sidebar-icons/mailbox.svg"
import MerchantIcon from "@spp/icons/sidebar-icons/merchant.svg"
import AccountIcon from "@spp/icons/sidebar-icons/account.svg"
import ActivityLogIcon from "@spp/icons/sidebar-icons/activity-log.svg"
import SettingIcon from "@spp/icons/sidebar-icons/setting.svg"

const sidebarLinks = [
	{
		name: "Home",
		link: "/dashboard",
		icon: <HomeIcon />,
	},
	{
		name: "Deposits",
		link: "/dashboard/deposits",
		icon: <DepositIcon />,
	},
	{
		name: "Withdrawals",
		link: "/dashboard/withdrawals",
		icon: <WithdrawalIcon />,
	},
	{
		name: "Tasks",
		link: "/dashboard/tasks",
		icon: <TaskIcon />,
	},
	{
		name: "Customers",
		link: "/dashboard/customers",
		icon: <CustomerIcon />,
	},
	{
		name: "Users",
		link: "/dashboard/users",
		icon: <UserIcon />,
	},
	{
		name: "Mailbox",
		link: "/dashboard/mailbox",
		icon: <MailboxIcon />,
	},
	{
		name: "Merchants",
		link: "/dashboard/merchants",
		icon: <MerchantIcon />,
	},
	{
		name: "Accounts",
		link: "/dashboard/accounts",
		icon: <AccountIcon />,
	},
	{
		name: "Activity Log",
		link: "/dashboard/activity-log",
		icon: <ActivityLogIcon />,
	},
	{
		name: "Settings",
		link: "/dashboard/settings",
		icon: <SettingIcon />,
	},
]

const DrawerContainer = styled(Drawer)(({ theme }) => ({
	width: Constants.DRAWER_MD_WIDTH,
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		width: Constants.DRAWER_MD_WIDTH,
	},
	[theme.breakpoints.up("xl")]: {
		width: Constants.DRAWER_WIDTH,
		"& .MuiDrawer-paper": {
			width: Constants.DRAWER_WIDTH,
		},
	},
}))

const StyledList = styled(List)(({ theme }) => ({
	marginTop: theme.spacing(3),
	"& .MuiListItem-root": {
		marginBottom: theme.spacing(1),
	},
	"& .MuiListItemButton-root": {
		padding: theme.spacing(2, 5),
	},
	"& .MuiListItemText-root": {
		margin: 0,
	},
	"& .MuiListItemText-root .MuiTypography-root, & .MuiListItemIcon-root": {
		color: theme.palette.secondary.main,
	},
	"& .MuiListItemIcon-root": {
		minWidth: 24,
		marginRight: theme.spacing(3),
	},
	"& .Mui-selected .MuiTypography-root, & .Mui-selected .MuiListItemIcon-root":
	{
		color: theme.palette.primary.main,
	},
}))

export default function Sidebar() {
	const pathName = usePathname()

	return (
		<DrawerContainer variant="permanent">
			<Box mr={2} mt={2} ml={4} mb={2}>
				<Image src="/logo.png" alt="App Logo" width={77} height={27} />
			</Box>

			<StyledList>
				{sidebarLinks.map((route, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton
							selected={pathName === route.link}
							LinkComponent={NextLink}
							href={route.link}
						>
							{route.icon && <ListItemIcon>{route.icon}</ListItemIcon>}

							<ListItemText
								primary={route.name}
								primaryTypographyProps={{
									variant: "SPP_H6",
								}}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</StyledList>
		</DrawerContainer>
	)
}

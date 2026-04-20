import {
	BookOpen,
	Building,
	Calendar,
	Monitor,
	Package,
	Star,
	User,
	Video,
	type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'release' -> t('nav.release')
	path: string // URL 路径，如 '/release'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const navigation: NavigationItem[] = [
	{
		key: 'release',
		path: '/release',
		icon: Calendar,
		isContentType: true,
	},
	{
		key: 'platforms',
		path: '/platforms',
		icon: Monitor,
		isContentType: true,
	},
	{
		key: 'guide',
		path: '/guide',
		icon: BookOpen,
		isContentType: true,
	},
	{
		key: 'editions',
		path: '/editions',
		icon: Package,
		isContentType: true,
	},
	{
		key: 'reviews',
		path: '/reviews',
		icon: Star,
		isContentType: true,
	},
	{
		key: 'media',
		path: '/media',
		icon: Video,
		isContentType: true,
	},
	{
		key: 'cast',
		path: '/cast',
		icon: User,
		isContentType: true,
	},
	{
		key: 'studio',
		path: '/studio',
		icon: Building,
		isContentType: true,
	},
]
export const NAVIGATION_CONFIG: NavigationItem[] = navigation

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = navigation.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['release', 'platforms', 'guide', ...]

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}

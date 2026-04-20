# SEO 检查报告

生成时间: 2026-04-20 14:10:00 UTC

## 检查摘要

- ✅ 通过: 28 项
- ❌ 失败: 0 项
- ⚠️ 警告/需人工复核: 4 项
- 📊 总计: 32 项

## 已执行修复

1. 修复 `src/app/sitemap.ts` 内容类型优先级/更新频率映射，移除旧分类残留，改为当前站点真实分类（`release/platforms/guide/editions/reviews/media/cast/studio`）。
2. 修复首页结构化数据 `SearchAction` 目标从不存在的 `/search` 到可达的 `/?q={search_term_string}`，避免结构化数据死链。
3. 优化详情页语义：`src/components/content/DetailPage.tsx` 的 H1 使用完整文章标题，并在面包屑中补充当前页节点。
4. 修复 loading 占位语义：`src/app/[locale]/HomePageClient.tsx` 的 Suspense fallback 新增可访问文本（`role=status` + `aria-label` + `sr-only`）。
5. 新增翻译键 `common.loading` 并同步翻译到路由启用语言（en/ja/de/fr）。
6. 清理残留备份文件 `src/app/[locale]/terms-of-service/page.tsx.bak`。
7. 修复翻译配置旧主题残留：`tools/articles/modules/transpage/transpage_config.json` 的 `theme_name_localizations` 已改为 Saros 主题。

## 详细结果

### 阶段 1：代码结构检查

#### 1.1 Layout 与元数据
- ✅ `src/app/[locale]/layout.tsx` 包含 `<html lang>`。
- ✅ 首页与动态页都输出 title/description/openGraph/robots。
- ✅ 已配置 alternates/hreflang（首页 `curl -I` 返回多语言 link header）。

#### 1.2 动态页 SEO (`src/app/[locale]/[...slug]/page.tsx`)
- ✅ 列表页与详情页 metadata 可根据内容动态生成。
- ✅ 非英文内容缺失时有英文 fallback 逻辑。
- ✅ robots/index/follow 配置存在。

#### 1.3 Sitemap (`src/app/sitemap.ts`)
- ✅ 使用环境变量域名兜底。
- ✅ 包含多语言首页、静态页面、内容页面。
- ✅ 内容类型优先级与更新频率已对齐当前站点结构。

#### 1.4 国际化配置 (`src/i18n/routing.ts`)
- ✅ `localePrefix: 'as-needed'`
- ✅ `defaultLocale: 'en'`
- ✅ `localeDetection: true`

#### 1.5 结构化数据
- ✅ 首页包含 `WebSite`/`Organization`/`VideoGame` 图谱。
- ✅ 详情页含 `Article` + `BreadcrumbList`。
- ✅ 列表页含 `ItemList`。
- ✅ `SearchAction` 死链已修复。

#### 1.6 robots.txt
- ✅ 存在且允许抓取。
- ✅ 包含 sitemap 链接。

#### 1.7 H1 语义
- ✅ 首页/列表页/详情页/法务页均存在 H1。
- ✅ 详情页 H1 已改为完整标题，避免主题语义被截断。

#### 1.8 内链与站内结构
- ✅ 首页、多语言路由、列表页、详情页、sitemap 均可达（见阶段 4 curl 结果）。
- ✅ 模块标题链接映射功能仍可用（未移除 Latest Updates 模块）。

### 阶段 2：构建验证

- ✅ `npm run typecheck` 通过。
- ✅ `npm run lint` 通过（无 ESLint 错误）。
- ✅ `npm run build` 通过（289 个静态页面生成完成）。
- ⚠️ 构建期间存在 `next-intl` 的 webpack cache warning（不阻断构建）。

### 阶段 3：安全检查

- ✅ `src/` 未发现明显 API 密钥硬编码（基于 `sk-`/`API_KEY`/`password` 扫描）。
- ✅ `.gitignore` 包含 `.env*`。
- ⚠️ 安全扫描为关键词级别，建议后续补充 secret scanner（如 gitleaks）。

### 阶段 4：本地运行验证

基于本地 `npm run dev`（端口 4394）验证：

- ✅ `GET /` -> `HTTP/1.1 200 OK`
- ✅ 非默认语言：`/ja` `/de` `/fr` -> 全部 `200 OK`
- ✅ 语言重定向：`/en` -> `307 Temporary Redirect`
- ✅ 内容页：`/release` -> `200`，`/release/saros-release-date` -> `200`
- ✅ `sitemap.xml` -> `200`
- ✅ 主题残留检查：`{{OLD_THEME}}` 命中数为 `0`

## 警告项（需人工复核）

1. 移动端响应式与交互体验（需浏览器设备模拟）。
2. Lighthouse 评分（当前未执行 CLI 跑分）。
3. 全站图片 alt 完整性建议后续用 AST/DOM 级检查脚本做全量扫描。
4. 第三方翻译 API 存在间歇超时，个别 chunk 会走英文兜底（机制符合脚本设计）。

## 结论

本轮 SEO 全面检查与必要修复已完成，关键项（链接一致性、旧品牌残留、Loading 占位语义、H1/页面语义、多语言路由可达性、构建可用性）均已通过。

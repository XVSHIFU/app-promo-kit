# MEMORY.md — HackOnVibe July 2026 比赛记忆

> 本文件是经过浏览器实测确认的事实（2026-07-08）。规则以官方站 hackonvibe.com 为准；如有冲突，以官方站最新为准并回写本文件。

## 1. 身份与链接

- **比赛**：HackOnVibe — July 2026（3 天线上 Vibe Coding 黑客松）
- **官方站（报名/提交/个人页）**：https://hackonvibe.com
- **本赛期页面**：`/hackathon/hackonvibe-2026-07`
- **DoraHacks 镜像页（参考）**：https://dorahacks.io/hackathon/hack-on-vibe-2026-07
- **官方 Discord 服务器**：https://discord.gg/tU6NqSaS8（所有沟通在此：组队/导师/提醒/答疑）
- **用户个人页**：https://hackonvibe.com/me

## 2. 账号状态（2026-07-08 确认）

- ✅ 用户已在 hackonvibe.com 登录（个人页 /me 可用）。
- ✅ DoraHacks 账号已创建（用于 BUIDL 提交镜像，按需）。
- ⚠️ **待办**：用户需确认已有 **Discord 账号**（注册要求填 Discord 昵称； kickoff 录像、组队、答疑都在 Discord）。若无，先去 discord.com 注册。
- ⚠️ **待办**：加入官方 Discord 服务器 discord.gg/tU6NqSaS8。

## 3. 主题与形式

- **主题**：Effective promotion of a newly launched mobile app（推广一款新上架的移动 App）。每个项目都按这个主题作为「早期产品实验」来评判。
- **日期**：2026 年 7 月 10–12 日（build weekend），结果 7/15–16 公布。
- **形式**：3 天线上，周末用 vibe coding 做出一个 AI 辅助的微产品（能打开、能懂、能试的日常小工具）。
- **组队**：solo 或 1–4 人。
- **奖池**：$100（Business Success 赛道：1st $50 / 2nd $30 / 3rd $20）+ 每位参与者获**可验证参与证书**（PDF，内嵌个人页超链接）；获奖者得 **Diploma（AI 产品工程卓越奖）**。
- **评委**：美国资深工程师 + IEEE Senior Member（Illia Levchenko 任 head judge；Roman Martynenko / Igor Kharchenko / Oleg Safranov / Oleh Sypiahin）。

## 4. 时间线（关键！MT = UTC-6，美山地时）

### 赛前准备
1. 创建 Discord 账号（昵称是注册必填项）
2. 在 HackOnVibe 注册（✅ 已完成）
3. 加入官方 Discord 服务器
4. 创建/加入队伍（solo 或 1–4）
5. 熟悉赛题

### Build Weekend & 结果（7/10–16）
| 时间（MT） | 事项 |
|---|---|
| 周五 7/10 12:00 PM | Kickoff call（Google Meet，有录像发 Discord） |
| 周六 7/11 | 导师答疑（产品/技术/商业） |
| **周日 7/12 9:00 PM** | **代码发 GitHub（硬截止）** |
| 周日 7/12 | 填问卷 + 5 分钟预览视频链接发组织者 |
| 7/12–14（周日–周二） | 评审投票 |
| 7/15–16（周三–周四） | 公布结果与颁奖 |

> MT = UTC-6。周日 7/12 9:00 PM MT = 周一 7/13 13:00 北京时间。**务必周日就交完，别卡线。**

## 5. 提交要求（四件套）

1. **可运行 Demo / 原型**：能打开、能试的成品（不是 pitch deck）。
2. **GitHub 仓库**：周日 7/12 9:00 PM MT 前发布。建议开源协议 MIT/Apache-2.0；README 清晰、能跑起来。
3. **预览视频**：官方站说 **5 分钟预览 + 视频链接**（YouTube / Google Docs 视频 / 其他均可，要有链接）；DoraHacks 镜像页说 ≤3 分钟 YouTube unlisted。**以官方站 5 分钟为准，提交前到 hackonvibe.com 复核**。
4. **问卷 + 产品说明**：填官方问卷；产品说明含目标用户 + 本赛期内做了什么（可复用自己旧代码，但评委只评分赛期内做的部分）。

## 6. 评判标准（DoraHacks 镜像页，官方站一致）

- **有用性与执行度**：解决真实日常问题、可运行 Demo、产品流程清晰。
- **AI 与产品深度**：AI 真正改善工作流、功能清晰、路线图现实。
- **商业潜力**：目标客户清晰、有定价/收入想法、能吸引首批用户。

> 三项要平衡。别只堆技术，要让评委看到「有人会用、能赚钱」。

## 7. 允许的技术

- AI 编码工具（Cursor 等）、no-code 工具、模板、API、开源库。
- 官方点名：OpenAI、Anthropic Claude、Cursor、No-code、Web。
- 可复用自己旧代码（但评委只评赛期内部分）。

## 8. 技术栈决策（总指挥建议，可由执行 agent 调整）

- **编辑器**：Cursor（vibe coding 主力）
- **AI 能力**：Claude / OpenAI API（按产品需要二选一或都用）
- **前端**：Next.js 或纯 HTML+Tailwind（轻量优先）
- **部署**：Vercel（秒级上线，Demo 直链）
- **更快路线**：Bolt / Lovable 等 AI no-code（若 Cursor 太慢可切）
- **代码托管**：GitHub（用户账号 push）

## 9. 候选产品方向（总指挥预选，待执行 agent 与用户敲定）

主题=推广一款新上架移动 App。3 天可交付的微产品方向：

1. **AI 推广素材生成器**（⭐ 最稳）——输 App 名+一句话定位 → 一键生成多渠道素材（落地页文案、应用商店描述、推文、Reddit/小红书帖、冷启动邮件）。LLM API + 简单前端，Demo 直观。
2. **AI 评论情感雷达**——监控 App Store/社媒评论，AI 分类情感+提炼需求，生成「下一步做啥」清单。偏数据。
3. **AI 种子用户外联助手**——按 App 定位生成个性化外联话术+目标社区清单，帮你找第一批用户。

## 10. 约束（硬性）

- 纯线上，不出差，不参加线下。
- 不碰真实资金交易（无期货/交易类）。
- WEEX AI Wars II 这类交易赛**不在本子项目范围**（总指挥已排除）。

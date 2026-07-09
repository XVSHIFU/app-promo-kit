# AppPromoKit — AI 应用推广素材生成器

> 为 **HackOnVibe 2026 七月赛** 黑客松构建（主题：推广一款新上架的移动 App）

> 🚀 **线上 Demo**：https://app-promo-kit.netlify.app

[English](./README.md) | **中文**

## 它能做什么

输入你的 App 名称和一句话定位 —— 秒级生成 **5 个渠道的推广素材**：

| 渠道 | 输出内容 |
|---|---|
| 🌐 落地页 | Hero 标题、副标题、功能亮点、行动按钮文案 |
| 📦 应用商店 | 副标题、完整描述、ASO 关键词 |
| 🐦 推文 | 3 条适合 Twitter/X 的推文（含字数统计） |
| 👾 Reddit | 真实、非推销式的 Reddit 帖子（标题+正文） |
| ✉️ 冷启动邮件 | 主题行 + 个性化外联正文 |

每个渠道的语气自动适配：应用商店 = 专业且可搜索，Twitter = 简洁有力，Reddit = 真实社区感，邮件 = 礼貌且个性化。

## AI 技术栈

- **模型**：DeepSeek v4（flash 快速、pro 高质量）通过 OpenAI 兼容 API
- **架构**：单次结构化 LLM 调用 → JSON 输出 → 标签页 UI
- **Prompt 工程**：系统提示词建立营销专家角色；用户提示词强制各渠道语气规则和 JSON schema
- **非简单套壳**：Prompt 编码了真实的营销知识（ASO 最佳实践、Reddit 社区规范、冷启动邮件惯例）—— AI 不是在"写文字"，而是在执行结构化的内容策略

## 技术栈

- **框架**：Next.js 16（App Router，webpack）
- **样式**：Tailwind CSS v4
- **UI 风格**：Linear Style（暗色极简开发者风）
- **AI**：DeepSeek API（OpenAI SDK 兼容）
- **部署**：Netlify（线上 https://app-promo-kit.netlify.app）
- **语言**：TypeScript
- **国际化**：中英文切换（自建轻量 i18n）

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/XVSHIFU/app-promo-kit.git
cd app-promo-kit

# 安装依赖
npm install

# 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local，填入你的 DeepSeek API key

# 启动开发服务器
npm run dev
# 打开 http://localhost:3000
```

### 环境变量

```
DEEPSEEK_API_KEY=你的-api-key
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
DEEPSEEK_MODEL_PRO=deepseek-v4-pro
```

## 目标用户

- **独立开发者**：第一次发布 App，没有营销预算
- **小型工作室**：需要多渠道推广素材但请不起营销机构
- **产品经理**：同时推进多个 App 发布，需要一致且高质量的文案

## 黑客松期间完成的工作

本项目基于一份预先搭好的骨架（Next.js 脚手架 + 初始 UI）起步，在 HackOnVibe 2026 七月赛构建周末（7 月 10–12 日）期间打磨为完整的可部署成品：
- Next.js 项目搭建（App Router + Tailwind）
- DeepSeek API 集成（结构化 JSON 输出）
- 多渠道 Prompt 工程系统
- Linear Style 暗色 UI + 标签页结果展示 + 复制功能
- 中英文双语切换
- Netlify 部署（线上 https://app-promo-kit.netlify.app）

## 开源协议

MIT

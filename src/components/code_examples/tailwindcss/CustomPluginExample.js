const plugin = require('tailwindcss/plugin');

module.exports = {
  // ...
  plugins: [
    plugin(function({ addUtilities, theme, e }) {
      const textGradientUtilities = {};
      const colors = theme('colors'); // 設定されている色を取得

      // 簡単な例として固定グラデーションを生成
      addUtilities({
        '.text-gradient-purple-pink-red': {
          'background-image': `linear-gradient(to right, ${colors.purple['400']}, ${colors.pink['500']}, ${colors.red['500']})`,
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
        }
      });

      // より動的に from-color, via-color, to-color を使えるようにするには、
      // マッチするユーティリティを生成する高度なプラグインAPIの知識が必要になります。
      // (例: matchUtilities ヘルパーなど)
    }),
  ],
};

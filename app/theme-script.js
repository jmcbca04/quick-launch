export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var savedTheme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', savedTheme);
            } catch (e) {
              console.log('Theme initialization error:', e);
            }
          })();
        `,
      }}
    />
  );
} 
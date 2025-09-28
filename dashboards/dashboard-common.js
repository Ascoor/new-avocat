(function () {
  const RUNTIME_STYLE_ID = 'dashboard-runtime-style';
  const RUNTIME_STYLE = `:root { color-scheme: dark; }
body { transition: background-position 1s ease, background-color 0.6s ease, color 0.6s ease; }
body.sidebar-mini #sidebar { overflow-y: auto; }
@keyframes dashboardFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
.dashboard-fade-in { animation: dashboardFadeUp 0.6s ease both; }
.dashboard-fade-in[style*="--dashboard-delay"] { animation-delay: var(--dashboard-delay); }
body.dashboard-animated { background-size: 260% 260%; animation: dashboardGradient 22s ease infinite; }
@keyframes dashboardGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.theme-light { color-scheme: light; }
.theme-light body, body.theme-light { color-scheme: light; }
.theme-light .bg-white\/5 { background-color: rgba(15, 23, 42, 0.08) !important; }
.theme-light .bg-white\/10 { background-color: rgba(15, 23, 42, 0.12) !important; }
.theme-light .bg-white\/20 { background-color: rgba(15, 23, 42, 0.18) !important; }
.theme-light .text-slate-300 { color: rgb(100 116 139) !important; }
.theme-light .text-slate-400 { color: rgb(148 163 184) !important; }
.theme-light .border-white\/10 { border-color: rgba(148, 163, 184, 0.25) !important; }
.theme-light .border-white\/5 { border-color: rgba(148, 163, 184, 0.18) !important; }
`;
  if (!document.getElementById(RUNTIME_STYLE_ID)) {
    const style = document.createElement('style');
    style.id = RUNTIME_STYLE_ID;
    style.textContent = RUNTIME_STYLE;
    document.head.appendChild(style);
  }

(function () {
  const ICON_PATHS = {
    'chart-bar': 'M3 3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3zm2 2v14h3V5H5zm5 4v10h3V9h-3zm5-4v14h3V5h-3z',
    'cursor-arrow': 'M6.672 3.045 19.185 9.11a1 1 0 0 1-.012 1.814l-4.822 2.406-1.712 5.375a1 1 0 0 1-1.845.094L8.98 13.97l-5.42-1.8a1 1 0 0 1-.116-1.862l12.513-6.066a.25.25 0 0 0-.285-.443L6.672 3.045z',
    'users': 'M7.5 7.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 15.75A4.75 4.75 0 0 1 7.75 11h.5A4.75 4.75 0 0 1 13 15.75v2.5a.75.75 0 0 1-.75.75h-8.5A.75.75 0 0 1 3 18.25v-2.5zm9.25 0A4.75 4.75 0 0 1 17 11h.5A4.75 4.75 0 0 1 22.25 15.75v2.5a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1-.75-.75v-2.5z',
    'sparkles': 'M12 2.25a.75.75 0 0 1 .699.474l1.02 2.422 2.422 1.02a.75.75 0 0 1 0 1.388l-2.422 1.02-1.02 2.422a.75.75 0 0 1-1.388 0l-1.02-2.422-2.422-1.02a.75.75 0 0 1 0-1.388l2.422-1.02 1.02-2.422A.75.75 0 0 1 12 2.25zm6.5 5.25a.75.75 0 0 1 .69.466l.57 1.355 1.355.57a.75.75 0 0 1 0 1.378l-1.355.57-.57 1.355a.75.75 0 0 1-1.38 0l-.569-1.355-1.355-.57a.75.75 0 0 1 0-1.378l1.355-.57.57-1.355a.75.75 0 0 1 .569-.466zM6.5 9a.75.75 0 0 1 .69.466l.57 1.355 1.355.57a.75.75 0 0 1 0 1.378l-1.355.57-.57 1.355a.75.75 0 0 1-1.38 0l-.569-1.355-1.355-.57a.75.75 0 0 1 0-1.378l1.355-.57.57-1.355A.75.75 0 0 1 6.5 9z',
    'calendar': 'M6.75 2.25a.75.75 0 0 1 .75.75V4.5h9V3a.75.75 0 0 1 1.5 0v1.5h1.5A2.25 2.25 0 0 1 21.75 6.75v11.25A2.25 2.25 0 0 1 19.5 20.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 4.5 4.5H6V3a.75.75 0 0 1 1.5 0v1.5h9V3a.75.75 0 0 1 1.5 0v1.5h1.5A2.25 2.25 0 0 1 21.75 6.75v11.25A2.25 2.25 0 0 1 19.5 20.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 4.5 4.5H6V3a.75.75 0 0 1 .75-.75zM4.5 9h15v1.5h-15V9z',
    'chat-bubble': 'M3 4.5A2.25 2.25 0 0 1 5.25 2.25h13.5A2.25 2.25 0 0 1 21 4.5v9a2.25 2.25 0 0 1-2.25 2.25H12.6l-3.9 3.12a.75.75 0 0 1-1.2-.585V15.75H5.25A2.25 2.25 0 0 1 3 13.5v-9zm3.75 3a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H6.75zm0 3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6z',
    'play': 'M5.25 4.432c0-1.885 2.036-3.046 3.674-2.033l9.093 5.568c1.567.96 1.567 3.106 0 4.066l-9.093 5.568c-1.638 1.013-3.674-.148-3.674-2.033V4.432z',
    'shield': 'M12 2.25a.75.75 0 0 1 .361.09l7.5 3.75a.75.75 0 0 1 .414.671v6.724c0 4.97-3.215 9.532-8.028 10.958a.75.75 0 0 1-.394 0C7.04 22.987 3.825 18.425 3.825 13.455V6.711a.75.75 0 0 1 .414-.671l7.5-3.75A.75.75 0 0 1 12 2.25z',
    'bank': 'M3 9.75a.75.75 0 0 1 .75-.75h.75V6a.75.75 0 0 1 .471-.696l6.75-2.7a.75.75 0 0 1 .558 0l6.75 2.7A.75.75 0 0 1 19.5 6v3h.75a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75zm1.5 2.25h1.5v8.25H4.5V12zm3 0h1.5v8.25H7.5V12zm3 0h1.5v8.25h-1.5V12zm3 0h1.5v8.25h-1.5V12zm3 0h1.5v8.25h-1.5V12z',
    'cloud': 'M7.5 19.5h10.5a3 3 0 0 0 .176-5.995A5.251 5.251 0 0 0 12.75 6a5.25 5.25 0 0 0-5.142 4.218 4.501 4.501 0 0 0-.108 9.282z',
    'folder': 'M2.25 5.25A2.25 2.25 0 0 1 4.5 3h4.086a2.25 2.25 0 0 1 1.59.659l1.878 1.878H19.5A2.25 2.25 0 0 1 21.75 7.5v11.25A2.25 2.25 0 0 1 19.5 21H4.5A2.25 2.25 0 0 1 2.25 18.75V5.25z',
    'cube': 'M9.53 2.882a1.5 1.5 0 0 1 .94 0l8.25 2.75A1.5 1.5 0 0 1 20 7.05v9.9a1.5 1.5 0 0 1-.94 1.418l-8.25 3a1.5 1.5 0 0 1-1.02 0l-8.25-3A1.5 1.5 0 0 1 1 16.95v-9.9a1.5 1.5 0 0 1 1.06-1.418l8.25-2.75zM3.5 8.041v7.815l7.5 2.727V10.79L3.5 8.04zm9 2.75v7.833l7.5-2.727V8.04l-7.5 2.75zm6.36-4.564L12 3.805 5.14 6.227 12 8.811l6.86-2.584z',
    'heart': 'M11.645 20.91a1 1 0 0 0 .71 0C16.6 19.164 21 14.815 21 9.737 21 6.101 18.314 3 14.889 3c-1.93 0-3.832.99-4.89 2.54C8.94 3.99 7.039 3 5.111 3 1.686 3-.999 6.101-.999 9.737c0 5.078 4.4 9.427 9.645 11.173z',
    'megaphone': 'M3 9a3 3 0 0 1 3-3h1.5a1.5 1.5 0 0 0 1.2-.6l2.475-3.3A1.5 1.5 0 0 1 15 2.7v18.6a1.5 1.5 0 0 1-3 .9l-2.475-3.3a1.5 1.5 0 0 0-1.2-.6H6a3 3 0 0 1-3-3V9z',
    'truck': 'M2.25 5.25A2.25 2.25 0 0 1 4.5 3h11.25A2.25 2.25 0 0 1 18 5.25V7.5h2.25A2.25 2.25 0 0 1 22.5 9.75V15a3 3 0 0 1-3 3H18a3 3 0 0 1-6 0H9a3 3 0 0 1-6 0H2.25a.75.75 0 0 1-.75-.75V5.25zm3 11.25a1.5 1.5 0 1 0 3 0h-3zm9 0a1.5 1.5 0 1 0 3 0h-3z',
    'building': 'M4.5 3.75A2.25 2.25 0 0 1 6.75 1.5h10.5A2.25 2.25 0 0 1 19.5 3.75V21a.75.75 0 0 1-.75.75H15V15a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 9 15v6.75H5.25a.75.75 0 0 1-.75-.75V3.75zm6 0v3h3v-3h-3z',
    'cog': 'M11.983 2a1 1 0 0 1 .997.92l.214 2.572a6.027 6.027 0 0 1 1.793.741l2.35-1.34a1 1 0 0 1 1.255.164l1.75 1.75a1 1 0 0 1-.164 1.255l-1.34 2.35a6.027 6.027 0 0 1 .741 1.793l2.572.214a1 1 0 0 1 .92.997v2.475a1 1 0 0 1-.92.997l-2.572.214a6.027 6.027 0 0 1-.741 1.793l1.34 2.35a1 1 0 0 1-.164 1.255l-1.75 1.75a1 1 0 0 1-1.255.164l-2.35-1.34a6.027 6.027 0 0 1-1.793.741l-.214 2.572a1 1 0 0 1-.997.92H9.508a1 1 0 0 1-.997-.92l-.214-2.572a6.027 6.027 0 0 1-1.793-.741l-2.35 1.34a1 1 0 0 1-1.255-.164l-1.75-1.75a1 1 0 0 1 .164-1.255l1.34-2.35a6.027 6.027 0 0 1-.741-1.793l-2.572-.214a1 1 0 0 1-.92-.997V11.49a1 1 0 0 1 .92-.997l2.572-.214a6.027 6.027 0 0 1 .741-1.793l-1.34-2.35a1 1 0 0 1 .164-1.255l1.75-1.75a1 1 0 0 1 1.255-.164l2.35 1.34a6.027 6.027 0 0 1 1.793-.741l.214-2.572A1 1 0 0 1 9.508 2h2.475zm1.517 10.737a2 2 0 1 0-3.999 0 2 2 0 0 0 3.999 0z',
    'tv': 'M4.5 3.75A2.25 2.25 0 0 1 6.75 1.5h10.5A2.25 2.25 0 0 1 19.5 3.75V16.5h1.5a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h1.5V3.75z',
    'map': 'M9.75 2.25a.75.75 0 0 1 .45.15l2.55 1.913 2.55-1.913a.75.75 0 0 1 .9 0l3 2.25a.75.75 0 0 1 .3.6v14.25a.75.75 0 0 1-1.2.6l-2.55-1.913-2.55 1.913a.75.75 0 0 1-.9 0l-2.55-1.913-2.55 1.913a.75.75 0 0 1-.9 0l-3-2.25a.75.75 0 0 1-.3-.6V3.15a.75.75 0 0 1 1.2-.6l2.55 1.913 2.55-1.913a.75.75 0 0 1 .45-.15z',
    'sun': 'M12 3.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 1 .75-.75zm6.364 1.636a.75.75 0 0 1 0 1.06l-1.061 1.061a.75.75 0 0 1-1.06-1.06l1.06-1.061a.75.75 0 0 1 1.061 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm8.25 3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM6.75 12a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75zm13.114 4.886a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0zM12 18.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zm-6.364-1.364a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0zM5.114 6.614a.75.75 0 0 1 0-1.06l1.06-1.061a.75.75 0 1 1 1.061 1.06L6.175 6.614a.75.75 0 0 1-1.061 0z',
    'moon': 'M21 12.75a9 9 0 0 1-8.818 8.996 9.002 9.002 0 0 1-8.2-13.038 8.25 8.25 0 0 0 11.06 11.06A9 9 0 0 0 21 12.75z',
    'trophy': 'M5.25 3A2.25 2.25 0 0 1 7.5.75h9A2.25 2.25 0 0 1 18.75 3v1.5H21a.75.75 0 0 1 .75.75 4.5 4.5 0 0 1-4.365 4.497A6.753 6.753 0 0 1 13.5 13.2v2.55h2.25a.75.75 0 0 1 0 1.5H8.25a.75.75 0 0 1 0-1.5H10.5V13.2a6.753 6.753 0 0 1-3.885-3.453A4.5 4.5 0 0 1 2.25 5.25a.75.75 0 0 1 .75-.75h2.25V3zm0 3h-1.5a3 3 0 0 0 2.829 2.987A6.717 6.717 0 0 1 5.25 6zm12 0a6.717 6.717 0 0 1-1.329 2.987A3 3 0 0 0 18.75 6h-1.5z',
    'book-open': 'M12 4.5c-1.07-1-2.534-1.5-4.364-1.5C4.221 3 2 4.586 2 7.5v9a.75.75 0 0 0 .75.75c2.59 0 4.36.353 5.386 1.223.884.748 1.36 1.789 1.864 3.259a.75.75 0 0 0 1.4 0c.504-1.47.98-2.511 1.864-3.259 1.026-.87 2.795-1.223 5.386-1.223a.75.75 0 0 0 .75-.75v-9c0-2.914-2.221-4.5-5.636-4.5C14.534 3 13.07 3.5 12 4.5z',
    'presentation-chart': 'M3 3.75A2.25 2.25 0 0 1 5.25 1.5h13.5A2.25 2.25 0 0 1 21 3.75V9H3V3.75zm0 7.5h18v4.5A2.25 2.25 0 0 1 18.75 18H13.5v2.25H15a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1 0-1.5h1.5V18H5.25A2.25 2.25 0 0 1 3 15.75v-4.5z',
    'shopping-bag': 'M7.5 4.5V6h9V4.5a4.5 4.5 0 1 0-9 0zM3 9a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 9v10.5A3 3 0 0 1 18 22.5H6A3 3 0 0 1 3 19.5V9zm7.5 3.75a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3zm3 0a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3z',
    'briefcase': 'M8.25 6V4.5A2.25 2.25 0 0 1 10.5 2.25h3a2.25 2.25 0 0 1 2.25 2.25V6H21a.75.75 0 0 1 .75.75v2.25H2.25V6.75A.75.75 0 0 1 3 6h5.25zm5.25 0V4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V6h4.5zM2.25 10.5h19.5v8.25A2.25 2.25 0 0 1 19.5 21H4.5a2.25 2.25 0 0 1-2.25-2.25v-8.25zm9.75 3.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5z',
    'stethoscope': 'M12 2.25a.75.75 0 0 1 .75.75v6.75a3.75 3.75 0 1 1-7.5 0V3a.75.75 0 0 1 1.5 0v6.75a2.25 2.25 0 1 0 4.5 0V3a.75.75 0 0 1 .75-.75zm6 6a3 3 0 0 1-.75 5.908V17.5a3.75 3.75 0 0 1-7.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a2.25 2.25 0 0 0 4.5 0v-3.342A3 3 0 0 1 18 8.25z',
    'beaker': 'M5.25 2.25A.75.75 0 0 1 6 1.5h12a.75.75 0 0 1 .75.75V5.25a.75.75 0 0 1-.22.53l-5.53 5.53v6.94a2.25 2.25 0 0 1-4.5 0v-6.94l-5.53-5.53a.75.75 0 0 1-.22-.53V2.25z',
    'scale': 'M12 2.25a.75.75 0 0 1 .75.75v3h4.5a.75.75 0 0 1 .619 1.18l-5.25 7.5a.75.75 0 0 1-1.238 0l-5.25-7.5A.75.75 0 0 1 6.75 6h4.5v-3a.75.75 0 0 1 .75-.75zm-5.332 9.24 2.25 3.214a3.75 3.75 0 1 1-2.25-3.214zm10.664 0a3.75 3.75 0 1 1-2.25 3.214l2.25-3.214z',
    'factory': 'M3.75 3A.75.75 0 0 1 4.5 2.25h3a.75.75 0 0 1 .75.75V6l4.5-3v3l4.5-3v19.5H3.75A.75.75 0 0 1 3 21V3.75A.75.75 0 0 1 3.75 3zm9.75 15h3v-3h-3v3zm-4.5-3h3v3h-3v-3zm-4.5 0h3v3h-3v-3z',
    'film': 'M4.5 3A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21H6v-4.5h3V21h6v-4.5h3V21h1.5a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3H18v4.5h-3V3H9v4.5H6V3H4.5z',
    'globe-alt': 'M12 2.25c-5.108 0-9.25 4.142-9.25 9.25s4.142 9.25 9.25 9.25 9.25-4.142 9.25-9.25S17.108 2.25 12 2.25zm7.698 8.25H15.7a15.81 15.81 0 0 0-1.124-5.098 7.754 7.754 0 0 1 5.122 5.098zM12 3.75c1.486 0 3.577 2.735 3.963 6.75H8.037C8.423 6.485 10.514 3.75 12 3.75zM7.3 12.75h9.4a15.81 15.81 0 0 1-1.124 5.098A7.754 7.754 0 0 1 7.3 12.75zm3.741 5.848A15.872 15.872 0 0 1 7.2 12.75H4.302a7.754 7.754 0 0 0 6.739 5.848zm6.017-5.848a15.872 15.872 0 0 1-3.841 5.848 7.754 7.754 0 0 0 6.739-5.848H17.058zM4.302 11.25H7.3A15.81 15.81 0 0 1 8.424 6.152 7.754 7.754 0 0 0 4.302 11.25z',
    'leaf': 'M12.75 3a9.75 9.75 0 0 1 9.75 9.75 9.75 9.75 0 0 1-12.6 9.303A5.251 5.251 0 0 1 5.5 17.25H4.125a2.625 2.625 0 0 1-2.625-2.625v-.375A11.25 11.25 0 0 1 12.75 3zm-4.5 9.75a4.5 4.5 0 0 0-4.5 4.5c0 .621.504 1.125 1.125 1.125h1.375a3.75 3.75 0 0 0 3.75-3.75v-1.875z',
    'basketball': 'M12 2.25A9.75 9.75 0 1 0 21.75 12 9.75 9.75 0 0 0 12 2.25zm7.314 8.25h-4.564a12.3 12.3 0 0 0-.753-4.43A8.255 8.255 0 0 1 19.314 10.5zm-6.064 0H10.75V4.058a10.77 10.77 0 0 1 2.5 6.442zm-3.5 0H4.686a8.255 8.255 0 0 1 5.317-6.68 12.3 12.3 0 0 0-.753 4.43zm0 3h2.5v6.442a10.77 10.77 0 0 1-2.5-6.442zm3.5 0h4.564a8.255 8.255 0 0 1-5.317 6.68 12.3 12.3 0 0 0 .753-4.43zm-6.81 0a12.3 12.3 0 0 0 .753 4.43A8.255 8.255 0 0 1 4.686 13.5z',
    'sidebar-toggle': 'M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z'
  };

  function createIcon(name, classes) {
    const path = ICON_PATHS[name] || ICON_PATHS['sparkles'];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="${classes}"><path d="${path}" /></svg>`;
  }

  function initDashboard(config) {
    const html = document.documentElement;
    const body = document.body;
    const theme = Object.assign({
      body: '',
      cardBg: 'bg-slate-900/80',
      cardBorder: 'border-slate-800',
      accentGradient: 'from-indigo-500 to-purple-500',
      accentText: 'text-indigo-400',
      highlightBg: 'bg-indigo-500/10 border-indigo-500/20',
      badgeBg: 'bg-white/10',
      badgeText: 'text-white'
    }, config.theme || {});

    if (theme.body) {
      theme.body.split(' ').forEach(cls => cls && body.classList.add(cls));
    }

    const styleId = 'dashboard-collapsible-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @media (min-width: 1024px) {
          #sidebar {
            transition: width 0.3s ease, padding 0.3s ease;
          }
          body.sidebar-mini #sidebar {
            width: 6rem;
            padding-inline: 1rem;
          }
          body.sidebar-mini #sidebar [data-role="brand-name"],
          body.sidebar-mini #sidebar [data-role="brand-tagline"],
          body.sidebar-mini #sidebar [data-role="sidebar-highlight"] {
            display: none !important;
          }
          body.sidebar-mini #sidebar nav a {
            padding-inline: 0.75rem;
          }
          body.sidebar-mini #sidebar nav a .sidebar-link-content {
            justify-content: center;
            gap: 0;
          }
          body.sidebar-mini #sidebar nav a .sidebar-icon {
            margin-inline-end: 0;
          }
          body.sidebar-mini #sidebar nav a .sidebar-label,
          body.sidebar-mini #sidebar nav a .sidebar-badge {
            display: none !important;
          }
          body.sidebar-mini #sidebarCollapse {
            width: 100%;
            justify-content: center;
          }
          body.sidebar-mini #sidebarCollapse [data-role="collapse-label"] {
            display: none;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const defaultActions = {
      open: { ar: 'فتح القائمة', en: 'Open menu' },
      close: { ar: 'إغلاق', en: 'Close' },
      collapse: { ar: 'تصغير الشريط', en: 'Collapse sidebar' },
      expand: { ar: 'توسيع الشريط', en: 'Expand sidebar' },
      themeToLight: { ar: 'وضع النهار', en: 'Day mode' },
      themeToDark: { ar: 'وضع الليل', en: 'Night mode' }
    };
    config.actions = Object.assign({}, defaultActions, config.actions || {});
    Object.keys(defaultActions).forEach(key => {
      config.actions[key] = Object.assign({}, defaultActions[key], config.actions[key] || {});
    });

    const DEFAULT_THEMES = {
      dark: {
        bodyBase: 'bg-slate-950 text-slate-100',
        bodyGradient: '',
        sidebarBase: 'bg-slate-950/80 backdrop-blur-xl lg:bg-slate-950/60',
        sidebarGradient: '',
        sidebarBorder: 'border-slate-800/70',
        sidebarBackdrop: 'bg-slate-900/70',
        cardBg: 'bg-slate-900/70 backdrop-blur-xl',
        cardBorder: 'border-slate-800/60',
        cardShadow: 'shadow-[0_28px_65px_-40px_rgba(15,23,42,0.8)]',
        accentGradient: 'from-indigo-500 to-purple-500',
        accentText: 'text-indigo-300',
        highlightBg: 'bg-indigo-500/10 border-indigo-500/20',
        badgeBg: 'bg-indigo-500/20',
        badgeText: 'text-white',
        mutedText: 'text-slate-400',
        subtleText: 'text-slate-300',
        navDefault: 'border border-slate-800/70 hover:bg-slate-900/70',
        navActive: 'border border-indigo-400/40 bg-indigo-500/10',
        navIconBg: 'bg-slate-900/70',
        navBadgeText: 'text-slate-400',
        statLabel: 'text-slate-400',
        statIconBg: 'bg-slate-900/70',
        deltaPositive: 'text-emerald-400',
        deltaNegative: 'text-rose-400',
        deltaNeutral: 'text-amber-400',
        primaryButton: 'bg-white/10 text-white hover:bg-white/20 focus:ring-white/30',
        secondaryButton: 'border border-white/10 text-slate-200 hover:bg-white/10',
        placeholderBorder: 'border-white/10',
        listBg: 'bg-slate-900/70',
        listBorder: 'border border-slate-800/70',
        listMuted: 'text-slate-400',
        progressTrack: 'bg-slate-900/70',
        timelineIconBg: 'bg-slate-900/70',
        timelineLine: 'bg-slate-800/70',
        timelineChip: 'bg-slate-900/70 text-slate-300',
        tableHeaderBg: 'bg-slate-900/60',
        tableHeaderText: 'text-slate-300',
        tableBorder: 'border-slate-800/60',
        themeToggleButton: 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10',
        themeToggleIconBg: 'bg-white/10',
        focusRing: 'focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-0',
        pillButton: 'border border-white/10 text-slate-200 bg-transparent hover:bg-white/10',
        pillButtonActive: 'border border-white/20 bg-white/10 text-white'
      },
      light: {
        bodyBase: 'bg-slate-50 text-slate-900',
        bodyGradient: '',
        sidebarBase: 'bg-white/90 backdrop-blur-xl lg:bg-white/70',
        sidebarGradient: '',
        sidebarBorder: 'border-slate-200',
        sidebarBackdrop: 'bg-slate-900/30',
        cardBg: 'bg-white/90 backdrop-blur-xl',
        cardBorder: 'border-slate-200',
        cardShadow: 'shadow-[0_24px_60px_-35px_rgba(15,23,42,0.35)]',
        accentGradient: 'from-indigo-500 to-purple-500',
        accentText: 'text-indigo-600',
        highlightBg: 'bg-indigo-500/10 border-indigo-300/60',
        badgeBg: 'bg-indigo-500/10',
        badgeText: 'text-indigo-600',
        mutedText: 'text-slate-500',
        subtleText: 'text-slate-500',
        navDefault: 'border border-slate-200 hover:bg-slate-100/80',
        navActive: 'border border-indigo-200 bg-indigo-500/10',
        navIconBg: 'bg-slate-100',
        navBadgeText: 'text-slate-500',
        statLabel: 'text-slate-500',
        statIconBg: 'bg-slate-100',
        deltaPositive: 'text-emerald-500',
        deltaNegative: 'text-rose-500',
        deltaNeutral: 'text-amber-500',
        primaryButton: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900/20',
        secondaryButton: 'border border-slate-300 text-slate-700 hover:bg-slate-100',
        placeholderBorder: 'border-slate-200',
        listBg: 'bg-white',
        listBorder: 'border border-slate-200',
        listMuted: 'text-slate-500',
        progressTrack: 'bg-slate-200',
        timelineIconBg: 'bg-slate-100',
        timelineLine: 'bg-slate-200',
        timelineChip: 'bg-slate-100 text-slate-600',
        tableHeaderBg: 'bg-slate-100/80',
        tableHeaderText: 'text-slate-500',
        tableBorder: 'border-slate-200',
        themeToggleButton: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100',
        themeToggleIconBg: 'bg-slate-900/5',
        focusRing: 'focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-0',
        pillButton: 'border border-slate-200 text-slate-700 bg-white/80 hover:bg-slate-100',
        pillButtonActive: 'border border-slate-300 bg-slate-900/10 text-slate-900'
      }
    };

    function sanitizeTheme(overrides) {
      if (!overrides || typeof overrides !== 'object') return {};
      const result = {};
      Object.keys(overrides).forEach(key => {
        if (key === 'dark' || key === 'light' || key === 'defaultMode') return;
        result[key] = overrides[key];
      });
      return result;
    }

    const themeConfig = config.theme || {};
    const hasExplicitModes = typeof themeConfig.dark === 'object' || typeof themeConfig.light === 'object';
    const themeModes = {
      dark: Object.assign({}, DEFAULT_THEMES.dark, sanitizeTheme(hasExplicitModes ? themeConfig.dark : themeConfig)),
      light: Object.assign({}, DEFAULT_THEMES.light, sanitizeTheme(hasExplicitModes ? themeConfig.light : themeConfig.light))
    };

    const themeStorageKey = `dashboard:theme:${window.location.pathname}`;
    const requestedMode = themeConfig.defaultMode === 'light' ? 'light' : 'dark';
    let themeMode = requestedMode;
    try {
      const storedTheme = localStorage.getItem(themeStorageKey);
      if (storedTheme === 'light' || storedTheme === 'dark') {
        themeMode = storedTheme;
      }
    } catch (error) {
      themeMode = requestedMode;
    }
    if (!themeModes[themeMode]) {
      themeMode = 'dark';
    }
    let theme = themeModes[themeMode];

    body.classList.add('antialiased', 'transition-colors', 'duration-500');
    body.classList.remove('bg-slate-950', 'text-slate-100');
    if (shell) {
      shell.classList.add('dashboard-shell');
    }
    if (sidebar) {
      sidebar.classList.add('transition-all', 'duration-300', 'will-change-transform');
      sidebar.classList.remove('bg-slate-900/95', 'lg:bg-slate-900/60', 'border-white/10', 'lg:border-l-0');
    }
    if (sidebarBackdrop) {
      sidebarBackdrop.classList.remove('bg-black/60');
    }

    const appliedClasses = {
      bodyBase: [],
      bodyGradient: [],
      sidebarBase: [],
      sidebarGradient: [],
      sidebarBorder: [],
      sidebarBackdrop: []
    };

    function parseClasses(value) {
      if (!value || typeof value !== 'string') return [];
      return value.split(/\s+/).filter(Boolean);
    }

    function setClassList(element, key, classes) {
      if (!element) return;
      const previous = appliedClasses[key] || [];
      if (previous.length) {
        element.classList.remove(...previous);
      }
      const next = Array.isArray(classes) ? classes : parseClasses(classes);
      if (next.length) {
        element.classList.add(...next);
      }
      appliedClasses[key] = next;
    }

    function updateThemePresentation() {
      setClassList(body, 'bodyBase', parseClasses(theme.bodyBase));
      if (theme.bodyGradient) {
        setClassList(body, 'bodyGradient', ['bg-gradient-to-br', 'dashboard-animated'].concat(parseClasses(theme.bodyGradient)));
      } else {
        if (appliedClasses.bodyGradient.length) {
          body.classList.remove(...appliedClasses.bodyGradient);
        }
        body.classList.remove('bg-gradient-to-br', 'dashboard-animated');
        appliedClasses.bodyGradient = [];
      }
      setClassList(sidebar, 'sidebarBase', parseClasses(theme.sidebarBase));
      if (sidebar) {
        if (theme.sidebarGradient) {
          setClassList(sidebar, 'sidebarGradient', ['bg-gradient-to-b'].concat(parseClasses(theme.sidebarGradient)));
        } else {
          if (appliedClasses.sidebarGradient.length) {
            sidebar.classList.remove(...appliedClasses.sidebarGradient);
          }
          sidebar.classList.remove('bg-gradient-to-b');
          appliedClasses.sidebarGradient = [];
        }
      }
      setClassList(sidebar, 'sidebarBorder', parseClasses(theme.sidebarBorder));
      setClassList(sidebarBackdrop, 'sidebarBackdrop', parseClasses(theme.sidebarBackdrop));
      body.classList.toggle('theme-light', themeMode === 'light');
      body.classList.toggle('theme-dark', themeMode === 'dark');
      html.classList.toggle('theme-light', themeMode === 'light');
      html.classList.toggle('theme-dark', themeMode === 'dark');
      document.documentElement.style.colorScheme = themeMode === 'light' ? 'light' : 'dark';
    }

    const storageKey = config.storageKey || `dashboard-mini-${window.location.pathname}`;
    let isMini = false;
    try {
      isMini = window.localStorage.getItem(storageKey) === '1';
    } catch (error) {
      isMini = false;
    }

    let currentLang = config.defaultLang || 'ar';
    let navLinks = [];
    let navLabels = [];
    let navBadges = [];
    let miniLabelNodes = [];
    let miniIconNodes = [];
    let miniToggle = null;
    let miniBaseClasses = [];
    const themeButtons = [];
    const langButtons = [];
    let offscreenClass = 'translate-x-full';

    function deltaClass(trend) {
      if (trend === 'negative') return theme.deltaNegative;
      if (trend === 'neutral') return theme.deltaNeutral;
      return theme.deltaPositive;
    }

    function updateCollapseButton(lang) {
      if (!collapseButton) return;
      const label = collapseButton.querySelector('[data-role="collapse-label"]');
      const text = isMini ? config.actions.expand[lang] : config.actions.collapse[lang];
      if (label) {
        label.textContent = text;
      }
      collapseButton.setAttribute('aria-label', text);
      collapseButton.title = text;
      collapseButton.setAttribute('aria-pressed', isMini ? 'true' : 'false');
    }

    function applyMiniState(mini, lang = 'ar') {
      if (!sidebar) return;
      isMini = mini;
      body.classList.toggle('sidebar-mini', mini);
      try {
        window.localStorage.setItem(storageKey, mini ? '1' : '0');
      } catch (error) {
        /* ignore persistence issues */
      }
      updateCollapseButton(lang);
    }

    function updateMiniToggleTheme() {
      if (!miniToggle) return;
      const base = miniBaseClasses.join(' ');
      miniToggle.className = `${base} ${theme.secondaryButton} ${theme.focusRing}`.trim();
      miniIconNodes.forEach(icon => {
        icon.className = `h-8 w-8 rounded-lg flex items-center justify-center transition-transform duration-300 ${theme.navIconBg}`;
        icon.innerHTML = createIcon('layout-sidebar', `h-4 w-4 ${theme.accentText}`);
      });
    }

    function createMiniToggle() {
      if (!sidebar) return null;
      const headerRow = sidebar.querySelector('.flex.items-start.justify-between.gap-3');
      const actionsWrap = headerRow ? headerRow.querySelector('.flex.items-center.gap-2') : null;
      if (!actionsWrap) return null;
      const button = document.createElement('button');
      button.type = 'button';
      miniBaseClasses = ['hidden', 'lg:inline-flex', 'items-center', 'gap-2', 'rounded-xl', 'text-xs', 'font-semibold', 'transition'];
      button.className = `${miniBaseClasses.join(' ')} ${theme.secondaryButton} ${theme.focusRing}`.trim();
      button.innerHTML = `
        <span data-role="mini-icon" class="h-8 w-8 rounded-lg flex items-center justify-center transition-transform duration-300 ${theme.navIconBg}">
          ${createIcon('layout-sidebar', `h-4 w-4 ${theme.accentText}`)}
        </span>
        <span data-role="collapse-label" class="whitespace-nowrap"></span>
      `;
      actionsContainer.prepend(collapseButton);
      collapseButton.addEventListener('click', () => {
        applyMiniState(!isMini, currentLang);
      });
    }

    function openSidebar() {
      if (!sidebar) return;
      sidebar.classList.remove(offscreenClass);
      sidebar.classList.add('translate-x-0');
      if (sidebarBackdrop) {
        sidebarBackdrop.classList.remove('pointer-events-none');
        sidebarBackdrop.classList.add('opacity-100');
      }
    }

    function closeSidebar() {
      if (!sidebar) return;
      sidebar.classList.add(offscreenClass);
      sidebar.classList.remove('translate-x-0');
      if (sidebarBackdrop) {
        sidebarBackdrop.classList.add('pointer-events-none');
        sidebarBackdrop.classList.remove('opacity-100');
      }
    }

    sidebarToggle && sidebarToggle.addEventListener('click', openSidebar);
    sidebarClose && sidebarClose.addEventListener('click', closeSidebar);
    sidebarBackdrop && sidebarBackdrop.addEventListener('click', closeSidebar);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    });

    const languageContainers = document.querySelectorAll('[data-role="language-switcher"]');
    languageContainers.forEach(container => {
      if (!container) return;
      container.innerHTML = '';
      ['ar', 'en'].forEach(lang => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.langButton = lang;
        button.textContent = lang === 'ar' ? 'ع' : 'En';
        button.className = 'px-3 py-1 text-xs font-semibold rounded-lg transition';
        button.setAttribute('aria-pressed', 'false');
        container.appendChild(button);
        langButtons.push(button);
      });
    });

    let currentLang = config.defaultLang || 'ar';

    function updateThemeButtons() {
      const targetMode = themeMode === 'dark' ? 'light' : 'dark';
      const label = targetMode === 'light' ? config.actions.themeToLight[currentLang] : config.actions.themeToDark[currentLang];
      themeButtons.forEach(entry => {
        const { button, icon, labelNode, baseClasses } = entry;
        button.className = `${baseClasses.join(' ')} ${theme.themeToggleButton} ${theme.focusRing}`.trim();
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
        button.setAttribute('aria-pressed', themeMode === 'light' ? 'true' : 'false');
        icon.className = `h-8 w-8 rounded-lg flex items-center justify-center transition-transform duration-300 ${theme.themeToggleIconBg}`;
        icon.innerHTML = createIcon(targetMode === 'light' ? 'sun' : 'moon', `h-4 w-4 ${theme.accentText}`);
        labelNode.textContent = label;
      });
    }

    function initThemeButtons() {
      const containers = document.querySelectorAll('[data-role="theme-toggle"]');
      containers.forEach(container => {
        const baseClasses = container.className ? container.className.split(/\s+/).filter(Boolean) : [];
        if (!baseClasses.includes('inline-flex') && !baseClasses.includes('flex')) {
          baseClasses.push('inline-flex');
        }
        if (!baseClasses.includes('items-center')) baseClasses.push('items-center');
        if (!baseClasses.includes('gap-2')) baseClasses.push('gap-2');
        if (!baseClasses.includes('rounded-xl')) baseClasses.push('rounded-xl');
        if (!baseClasses.includes('text-xs')) baseClasses.push('text-xs');
        if (!baseClasses.includes('font-semibold')) baseClasses.push('font-semibold');
        if (!baseClasses.includes('transition')) baseClasses.push('transition');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = baseClasses.join(' ');
        button.setAttribute('data-theme-toggle-button', '');
        const icon = document.createElement('span');
        const labelNode = document.createElement('span');
        labelNode.classList.add('whitespace-nowrap');
        button.appendChild(icon);
        button.appendChild(labelNode);
        container.replaceWith(button);
        themeButtons.push({ button, icon, label: labelNode, baseClasses });
        button.addEventListener('click', () => {
          setThemeMode(themeMode === 'dark' ? 'light' : 'dark', true);
        });
      });
      updateThemeButtons();
    }

    langButtons.forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.langButton));
    });

    function updateLanguageButtons() {
      langButtons.forEach(btn => {
        const active = btn.dataset.langButton === currentLang;
        const base = ['px-3', 'py-1', 'text-xs', 'font-semibold', 'rounded-lg', 'transition'];
        const themeClasses = parseClasses(active ? theme.pillButtonActive : theme.pillButton);
        btn.className = base.concat(themeClasses).join(' ');
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    function renderBrand(lang) {
      const badgeElements = document.querySelectorAll('[data-role="brand-badge"], [data-role="mobile-badge"]');
      badgeElements.forEach(el => {
        if (!el) return;
        el.textContent = config.brand.badge || '∞';
        el.className = `h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-semibold shadow-inner ${theme.badgeBg} ${theme.badgeText}`;
      });

      const brandNameElements = document.querySelectorAll('[data-role="brand-name"], [data-role="mobile-brand-name"]');
      brandNameElements.forEach(el => {
        if (el) {
          el.textContent = config.brand.name[lang];
        }
      });

      const taglineElements = document.querySelectorAll('[data-role="brand-tagline"], [data-role="mobile-brand-tagline"]');
      taglineElements.forEach(el => {
        if (el) {
          el.textContent = config.brand.tagline[lang];
          el.className = `text-sm ${theme.subtleText}`;
        }
      });
    }

    function renderNav(lang) {
      const navContainer = document.querySelector('[data-role="sidebar-nav"]');
      if (!navContainer) return;
      navContainer.innerHTML = '';
      navLinks = [];
      navLabels = [];
      navBadges = [];
      const baseClasses = 'flex items-center justify-between px-4 py-3 rounded-xl transition duration-200';
      (config.nav || []).forEach((item, index) => {
        const link = document.createElement('a');
        link.href = `#${item.id}`;
        link.className = `flex items-center justify-between px-4 py-3 rounded-xl border ${index === 0 ? 'bg-white/10 border-white/10' : 'border-white/5 hover:bg-white/5'} transition`;
        link.innerHTML = `
          <span class="flex items-center gap-3 text-sm sidebar-link-content">
            <span class="h-9 w-9 rounded-xl flex items-center justify-center bg-white/5 sidebar-icon">
              ${createIcon(item.icon, `h-5 w-5 ${theme.accentText}`)}
            </span>
            <span class="font-medium sidebar-label">${item.label[lang]}</span>
          </span>
          <span class="text-xs text-slate-400 sidebar-badge">${item.badge ? item.badge[lang] : ''}</span>
        `;
        link.setAttribute('aria-label', item.label[lang]);
        link.title = item.label[lang];
        link.className = `${baseClasses} ${index === 0 ? theme.navActive : theme.navDefault}`;
        const left = document.createElement('span');
        left.className = 'flex items-center gap-3 text-sm transition-all duration-300';
        const iconWrapper = document.createElement('span');
        iconWrapper.className = `h-9 w-9 rounded-xl flex items-center justify-center ${theme.navIconBg}`;
        iconWrapper.innerHTML = createIcon(item.icon, `h-5 w-5 ${theme.accentText}`);
        const labelSpan = document.createElement('span');
        labelSpan.className = 'sidebar-label font-medium transition-all duration-300';
        labelSpan.textContent = item.label[lang];
        left.appendChild(iconWrapper);
        left.appendChild(labelSpan);
        link.appendChild(left);
        const badgeSpan = document.createElement('span');
        badgeSpan.className = `sidebar-badge text-xs transition-all duration-300 ${theme.navBadgeText}`;
        badgeSpan.textContent = item.badge ? item.badge[lang] : '';
        link.appendChild(badgeSpan);
        navContainer.appendChild(link);
      });
    }

    function renderHighlight(lang) {
      const highlight = document.querySelector('[data-role="sidebar-highlight"]');
      if (!highlight || !config.highlight) return;
      const highlightValue = typeof config.highlight.value === 'object'
        ? config.highlight.value[lang]
        : config.highlight.value;
      highlight.innerHTML = `
        <div class="rounded-2xl border ${theme.highlightBg} ${theme.cardShadow} p-5 space-y-3">
          <p class="text-xs uppercase tracking-wide ${theme.mutedText}">${config.highlight.label[lang]}</p>
          <p class="text-2xl font-semibold">${config.highlight.value}</p>
          <p class="text-sm ${theme.subtleText}">${config.highlight.description[lang]}</p>
        </div>
      `;
    }

    function renderHeader(lang) {
      const header = document.querySelector('[data-role="main-header"]');
      if (!header) return;
      const primary = config.header.primary ? `<button class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${theme.primaryButton} ${theme.focusRing}">${config.header.primary[lang]}</button>` : '';
      const secondary = config.header.secondary ? `<button class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${theme.secondaryButton} ${theme.focusRing}">${config.header.secondary[lang]}</button>` : '';
      header.innerHTML = `
        <div>
          <h1 class="text-3xl font-bold">${config.header.title[lang]}</h1>
          <p class="mt-2 ${theme.subtleText}">${config.header.subtitle[lang]}</p>
        </div>
        <div class="flex flex-wrap gap-3">
          ${secondary}
          ${primary}
        </div>
      `;
    }

    function renderStats(lang) {
      const statsContainer = document.querySelector('[data-role="stats"]');
      if (!statsContainer) return;
      statsContainer.innerHTML = '';
      (config.stats || []).forEach(stat => {
        const card = document.createElement('div');
        card.className = `rounded-2xl border ${theme.cardBorder} ${theme.cardBg} p-5 space-y-4`;
        card.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm ${theme.statLabel}">${stat.label[lang]}</p>
              <p class="mt-3 text-3xl font-semibold">${stat.value}</p>
            </div>
            <span class="h-12 w-12 rounded-xl flex items-center justify-center ${theme.statIconBg}">
              ${createIcon(stat.icon, `h-6 w-6 ${theme.accentText}`)}
            </span>
          </div>
          <p class="${deltaClass(stat.trend)} text-sm font-medium">${stat.delta[lang]}</p>
        `;
        statsContainer.appendChild(card);
      });
    }

    function renderPanels(lang) {
      const panelsContainer = document.querySelector('[data-role="panels"]');
      if (!panelsContainer) return;
      panelsContainer.innerHTML = '';
      (config.panels || []).forEach(panel => {
        const section = document.createElement('section');
        section.className = `rounded-2xl border ${theme.cardBorder} ${theme.cardBg} p-6 space-y-6 ${panel.span || ''}`;
        let content = '';
        if (panel.type === 'chart') {
          content = `
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 class="text-xl font-semibold">${panel.title[lang]}</h2>
                <p class="text-sm ${theme.subtleText}">${panel.subtitle[lang]}</p>
              </div>
              ${panel.action ? `<button class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${theme.secondaryButton} ${theme.focusRing}">${panel.action[lang]}</button>` : ''}
            </div>
            <div class="h-56 rounded-2xl border border-dashed ${theme.placeholderBorder} bg-gradient-to-br ${theme.accentGradient} opacity-90 flex items-center justify-center text-sm text-white/90">
              ${panel.placeholder[lang]}
            </div>
          `;
        } else if (panel.type === 'list') {
          const items = (panel.items || []).map(item => `
            <div class="flex items-center justify-between rounded-xl ${theme.listBorder} ${theme.listBg} px-4 py-3">
              <div class="flex items-center gap-3">
                <span class="h-10 w-10 rounded-xl flex items-center justify-center ${theme.timelineIconBg}">
                  ${createIcon(item.icon || 'sparkles', `h-5 w-5 ${theme.accentText}`)}
                </span>
                <div>
                  <p class="text-sm font-semibold">${item.title[lang]}</p>
                  <p class="text-xs ${theme.listMuted}">${item.subtitle[lang]}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-base font-semibold">${item.value}</p>
                <p class="text-xs ${theme.listMuted}">${item.delta[lang]}</p>
              </div>
            </div>
          `).join('');
          content = `
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">${panel.title[lang]}</h2>
                ${panel.action ? `<span class="text-xs ${theme.listMuted}">${panel.action[lang]}</span>` : ''}
              </div>
              ${items}
            </div>
          `;
        } else if (panel.type === 'progress') {
          const items = (panel.items || []).map(item => `
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span>${item.title[lang]}</span>
                <span class="${theme.subtleText}">${item.value}</span>
              </div>
              <div class="h-2 rounded-full ${theme.progressTrack} overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r ${theme.accentGradient}" style="width:${item.percent}"></div>
              </div>
              <p class="text-xs ${theme.listMuted}">${item.subtitle[lang]}</p>
            </div>
          `).join('');
          content = `
            <div class="space-y-4">
              <h2 class="text-lg font-semibold">${panel.title[lang]}</h2>
              ${items}
            </div>
          `;
        } else if (panel.type === 'table') {
          const headers = (panel.headers || []).map(header => `<th class="px-4 py-2 text-left text-xs font-semibold ${theme.tableHeaderText}">${header[lang]}</th>`).join('');
          const rows = (panel.rows || []).map(row => `<tr class="border-t ${theme.tableBorder}">
              <td class="px-4 py-3 text-sm font-medium">${row.name[lang]}</td>
              <td class="px-4 py-3 text-sm ${theme.subtleText}">${row.metric}</td>
              <td class="px-4 py-3 text-sm ${deltaClass(row.trend)} font-medium">${row.delta[lang]}</td>
            </tr>`).join('');
          content = `
            <div class="space-y-4 overflow-hidden">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">${panel.title[lang]}</h2>
                ${panel.action ? `<span class="text-xs ${theme.listMuted}">${panel.action[lang]}</span>` : ''}
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full text-left">
                  <thead class="${theme.tableHeaderBg}">
                    <tr>${headers}</tr>
                  </thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            </div>
          `;
        } else if (panel.type === 'timeline') {
          const items = (panel.items || []).map(item => `
            <div class="flex gap-4">
              <div class="flex flex-col items-center">
                <span class="h-10 w-10 rounded-xl flex items-center justify-center ${theme.timelineIconBg}">${createIcon(item.icon || 'sparkles', `h-5 w-5 ${theme.accentText}`)}</span>
                <span class="flex-1 w-px ${theme.timelineLine}"></span>
              </div>
              <div class="pb-6">
                <p class="text-sm font-semibold">${item.title[lang]}</p>
                <p class="text-xs ${theme.listMuted} mt-1">${item.subtitle[lang]}</p>
                <span class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${theme.timelineChip} mt-3">${item.time[lang]}</span>
              </div>
            </div>
          `).join('');
          content = `
            <div class="space-y-4">
              <h2 class="text-lg font-semibold">${panel.title[lang]}</h2>
              <div class="space-y-4">${items}</div>
            </div>
          `;
        }
        section.innerHTML = content;
        panelsContainer.appendChild(section);
      });
    }

    function renderAll() {
      renderBrand(currentLang);
      renderNav(currentLang);
      renderHighlight(currentLang);
      renderHeader(currentLang);
      renderStats(currentLang);
      renderPanels(currentLang);
    }

    function updateActionLabels() {
      const openLabel = document.querySelector('[data-role="open-label"]');
      const closeLabel = document.querySelector('[data-role="close-label"]');
      if (openLabel) openLabel.textContent = config.actions.open[currentLang];
      if (closeLabel) closeLabel.textContent = config.actions.close[currentLang];
      if (sidebarToggle) {
        sidebarToggle.setAttribute('aria-label', config.actions.open[currentLang]);
        sidebarToggle.setAttribute('title', config.actions.open[currentLang]);
      }
      if (sidebarClose) {
        sidebarClose.setAttribute('aria-label', config.actions.close[currentLang]);
        sidebarClose.setAttribute('title', config.actions.close[currentLang]);
      }
    }

    function updateDirection(lang) {
      const isRTL = lang === 'ar';
      if (sidebar) {
        sidebar.classList.toggle('right-0', isRTL);
        sidebar.classList.toggle('left-0', !isRTL);
        sidebar.classList.toggle('border-l', isRTL);
        sidebar.classList.toggle('border-r', !isRTL);
        sidebar.classList.toggle('lg:border-l-0', isRTL);
        sidebar.classList.toggle('lg:border-r-0', !isRTL);
        sidebar.classList.remove('translate-x-full', '-translate-x-full');
        offscreenClass = isRTL ? 'translate-x-full' : '-translate-x-full';
        sidebar.classList.add(offscreenClass);
      }
      if (miniToggle) {
        miniToggle.classList.toggle('flex-row-reverse', isRTL);
      }
    }

    function applyDocumentTitle(lang) {
      const title = document.querySelector('title');
      if (title && config.meta && config.meta.title) {
        title.textContent = config.meta.title[lang];
      }
    }

    function setThemeMode(mode, persist) {
      const nextMode = mode === 'light' ? 'light' : 'dark';
      themeMode = themeModes[nextMode] ? nextMode : 'dark';
      theme = themeModes[themeMode];
      if (persist) {
        try {
          localStorage.setItem(themeStorageKey, themeMode);
        } catch (error) {
          // ignore storage issues
        }
      }
      updateThemePresentation();
      renderAll();
      updateLanguageButtons();
      updateThemeButtons();
      updateMiniToggleTheme();
      syncMiniPresentation();
    }

    function setLanguage(lang) {
      currentLang = lang;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      body.classList.toggle('font-english', lang === 'en');
      updateDirection(lang);
      renderAll();
      updateLanguageButtons();
      updateActionLabels();
      updateThemeButtons();
      updateMiniToggleTheme();
      applyDocumentTitle(lang);
      syncMiniPresentation();
    }

    updateThemePresentation();
    initThemeButtons();
    setLanguage(currentLang);
  }
  window.initDashboard = initDashboard;
})();

# Ticket System

מערכת לניהול קריאות שירות - מבחן בית.

אפשר לפתוח קריאה חדשה, לראות את כל הקריאות בטבלה, לסנן לפי סטטוס, לחפש לפי כותרת, לשנות סטטוס ולמחוק קריאה.

- **server** - ASP.NET Core 9 Web API + Entity Framework Core + SQLite
- **client** - React + TypeScript (Vite), MUI, axios

## מה צריך להתקין

- .NET 9 SDK
- Node.js

## הרצה

צריך שני טרמינלים - אחד לשרת ואחד ללקוח.

### שרת

```
cd server
dotnet tool restore
dotnet ef database update
dotnet run
```

הפקודה `dotnet ef database update` יוצרת את מסד הנתונים (`tickets.db`).
השרת רץ על http://localhost:5244

### לקוח

```
cd client
copy .env.example .env
npm install
npm run dev
```

(ב-Mac/Linux: `cp` במקום `copy`)

האתר רץ על http://localhost:5173

## API

- `GET /api/tickets` - כל הקריאות. אפשר לסנן עם `?status=` ו/או `?priority=`
- `POST /api/tickets` - פתיחת קריאה (כותרת ותיאור חובה, אחרת 400)
- `PATCH /api/tickets/{id}/status` - עדכון סטטוס (404 אם הקריאה לא קיימת)
- `DELETE /api/tickets/{id}` - מחיקה (404 אם הקריאה לא קיימת)

סטטוס: 0 פתוח, 1 בטיפול, 2 סגור
דחיפות: 0 נמוכה, 1 בינונית, 2 גבוהה

בקובץ `server/server.http` יש בקשות מוכנות לבדיקה.

## מבנה

בשרת הקוד מחולק ל-Controller, Service ו-Repository. ה-API מחזיר DTOs ולא את הישויות של מסד הנתונים.

בלקוח כל הקריאות לשרת נמצאות ב-`src/api/ticketsApi.ts`, והרכיבים נמצאים ב-`src/components`.

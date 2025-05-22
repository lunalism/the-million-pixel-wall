// app/admin/reports/page.tsx

export default function AdminReportsPage() {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            View and manage reported pixel ads submitted by users.
          </p>
        </div>
  
        {/* 추후에 리스트나 테이블 컴포넌트 들어갈 자리 */}
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          🚧 This section is under construction.
          <br />
          Reported pixels will appear here once implemented.
        </div>
      </div>
    );
  }
  
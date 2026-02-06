"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Search,
  LogOut,
  Users,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  UserCog,
  Mail,
  Ban,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Member {
  id: number;
  name: string;
  email: string;
  service: string;
  status: "active" | "inactive" | "pending";
  role: "Admin" | "Member";
  lastAccess: string;
  joinedAt: string;
}

type SortKey = "name" | "service" | "status" | "role" | "lastAccess" | "joinedAt";
type SortDir = "asc" | "desc";

/* ------------------------------------------------------------------ */
/*  Mock Data (20 rows for pagination)                                 */
/* ------------------------------------------------------------------ */

const MEMBERS: Member[] = [
  { id: 1, name: "김민수", email: "minsu.kim@company.com", service: "Dashboard", status: "active", role: "Admin", lastAccess: "2026-02-06", joinedAt: "2024-03-15" },
  { id: 2, name: "이지영", email: "jiyoung.lee@company.com", service: "Analytics", status: "active", role: "Member", lastAccess: "2026-02-05", joinedAt: "2024-06-22" },
  { id: 3, name: "박서준", email: "seojun.park@company.com", service: "Dashboard", status: "inactive", role: "Member", lastAccess: "2026-01-10", joinedAt: "2024-01-08" },
  { id: 4, name: "최유진", email: "yujin.choi@company.com", service: "CMS", status: "active", role: "Admin", lastAccess: "2026-02-06", joinedAt: "2023-11-30" },
  { id: 5, name: "정하은", email: "haeun.jung@company.com", service: "Analytics", status: "pending", role: "Member", lastAccess: "2026-02-04", joinedAt: "2025-01-12" },
  { id: 6, name: "강도윤", email: "doyun.kang@company.com", service: "API Gateway", status: "inactive", role: "Member", lastAccess: "2025-12-20", joinedAt: "2024-07-19" },
  { id: 7, name: "윤서현", email: "seohyun.yoon@company.com", service: "Dashboard", status: "active", role: "Member", lastAccess: "2026-02-06", joinedAt: "2025-04-05" },
  { id: 8, name: "임재혁", email: "jaehyuk.lim@company.com", service: "CMS", status: "active", role: "Admin", lastAccess: "2026-02-03", joinedAt: "2023-09-14" },
  { id: 9, name: "한소희", email: "sohee.han@company.com", service: "Analytics", status: "inactive", role: "Member", lastAccess: "2025-11-15", joinedAt: "2024-10-01" },
  { id: 10, name: "오준서", email: "junseo.oh@company.com", service: "API Gateway", status: "active", role: "Member", lastAccess: "2026-02-06", joinedAt: "2025-08-20" },
  { id: 11, name: "서지훈", email: "jihoon.seo@company.com", service: "Dashboard", status: "active", role: "Member", lastAccess: "2026-02-06", joinedAt: "2025-09-01" },
  { id: 12, name: "나은빈", email: "eunbin.na@company.com", service: "CMS", status: "pending", role: "Member", lastAccess: "2026-02-01", joinedAt: "2026-01-28" },
  { id: 13, name: "문채원", email: "chaewon.moon@company.com", service: "Analytics", status: "active", role: "Admin", lastAccess: "2026-02-05", joinedAt: "2024-04-10" },
  { id: 14, name: "배진우", email: "jinwoo.bae@company.com", service: "API Gateway", status: "inactive", role: "Member", lastAccess: "2025-10-30", joinedAt: "2024-08-15" },
  { id: 15, name: "조예린", email: "yerin.jo@company.com", service: "Dashboard", status: "active", role: "Member", lastAccess: "2026-02-06", joinedAt: "2025-05-22" },
  { id: 16, name: "허태양", email: "taeyang.heo@company.com", service: "CMS", status: "active", role: "Member", lastAccess: "2026-02-04", joinedAt: "2025-07-11" },
  { id: 17, name: "송다인", email: "dain.song@company.com", service: "Analytics", status: "pending", role: "Member", lastAccess: "2026-01-30", joinedAt: "2026-01-15" },
  { id: 18, name: "유승호", email: "seungho.yoo@company.com", service: "API Gateway", status: "active", role: "Admin", lastAccess: "2026-02-06", joinedAt: "2023-12-05" },
  { id: 19, name: "장하린", email: "harin.jang@company.com", service: "Dashboard", status: "inactive", role: "Member", lastAccess: "2025-09-18", joinedAt: "2024-11-20" },
  { id: 20, name: "권도현", email: "dohyun.kwon@company.com", service: "CMS", status: "active", role: "Member", lastAccess: "2026-02-05", joinedAt: "2025-10-03" },
];

const PAGE_SIZE = 10;

/* ------------------------------------------------------------------ */
/*  Sortable Table Head                                                */
/* ------------------------------------------------------------------ */

function SortableHead({
  children,
  sortKey,
  currentSort,
  currentDir,
  onSort,
  className,
}: {
  children: React.ReactNode;
  sortKey: SortKey;
  currentSort: SortKey | null;
  currentDir: SortDir;
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const active = currentSort === sortKey;
  return (
    <TableHead className={className}>
      <button
        type="button"
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        onClick={() => onSort(sortKey)}
      >
        {children}
        {active ? (
          currentDir === "asc" ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />
        ) : (
          <ArrowUpDown className="size-3.5 opacity-40" />
        )}
      </button>
    </TableHead>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Member["status"] }) {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="gap-1.5 border-success-100 bg-success-50 text-success-700">
          <span className="inline-block size-1.5 rounded-full bg-success-500" />
          활성
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="outline" className="gap-1.5 border-border bg-muted text-muted-foreground">
          <span className="inline-block size-1.5 rounded-full bg-muted-foreground/50" />
          비활성
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="gap-1.5 border-warning-100 bg-warning-50 text-warning-700">
          <span className="inline-block size-1.5 rounded-full bg-warning-500" />
          대기
        </Badge>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Members Page                                                       */
/* ------------------------------------------------------------------ */

export default function MembersPage({ onLogout }: { onLogout: () => void }) {
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState<SortKey | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");
  const [page, setPage] = React.useState(1);
  const [members, setMembers] = React.useState(MEMBERS);

  /* ---- Filter ---- */
  const filtered = members.filter((m) => {
    if (roleFilter !== "all" && m.role !== roleFilter) return false;
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.service.toLowerCase().includes(q)
      );
    }
    return true;
  });

  /* ---- Sort ---- */
  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  /* ---- Pagination ---- */
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  React.useEffect(() => {
    setPage(1);
  }, [roleFilter, statusFilter, search]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleRoleChange(memberId: number, newRole: "Admin" | "Member") {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)),
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ---- Top Nav ---- */}
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <svg className="size-4 text-primary-foreground" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5Z" fill="currentColor" />
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Admin Console</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2 text-muted-foreground">
            <LogOut className="size-4" />
            로그아웃
          </Button>
        </div>
      </header>

      {/* ---- Main ---- */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Page Title */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Users className="size-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">멤버 목록</h1>
            <p className="text-sm text-muted-foreground">조직 멤버를 관리하세요.</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-xl border bg-card">
          {/* ---- Toolbar ---- */}
          <div className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Filters */}
            <div className="flex items-center gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[130px]" size="sm">
                  <SelectValue placeholder="역할" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 역할</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]" size="sm">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="active">활성</SelectItem>
                  <SelectItem value="inactive">비활성</SelectItem>
                  <SelectItem value="pending">대기</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Right: Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="이름, 이메일, 서비스 검색"
                className="h-8 pl-9 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* ---- Table ---- */}
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <SortableHead sortKey="name" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="pl-4">
                  이름
                </SortableHead>
                <SortableHead sortKey="service" currentSort={sortKey} currentDir={sortDir} onSort={handleSort}>
                  서비스
                </SortableHead>
                <SortableHead sortKey="status" currentSort={sortKey} currentDir={sortDir} onSort={handleSort}>
                  상태
                </SortableHead>
                <SortableHead sortKey="role" currentSort={sortKey} currentDir={sortDir} onSort={handleSort}>
                  역할
                </SortableHead>
                <SortableHead sortKey="lastAccess" currentSort={sortKey} currentDir={sortDir} onSort={handleSort}>
                  최근 접속
                </SortableHead>
                <SortableHead sortKey="joinedAt" currentSort={sortKey} currentDir={sortDir} onSort={handleSort}>
                  가입일
                </SortableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                paged.map((member) => (
                  <TableRow key={member.id}>
                    {/* Name + Email */}
                    <TableCell className="pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                            {member.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{member.name}</span>
                          <span className="text-xs text-muted-foreground">{member.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    {/* Service */}
                    <TableCell className="text-muted-foreground">{member.service}</TableCell>
                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={member.status} />
                    </TableCell>
                    {/* Role (dropdown) */}
                    <TableCell>
                      <Select
                        value={member.role}
                        onValueChange={(v) => handleRoleChange(member.id, v as "Admin" | "Member")}
                      >
                        <SelectTrigger className="h-7 w-[100px] text-xs" size="sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    {/* Last Access */}
                    <TableCell className="text-muted-foreground">{member.lastAccess}</TableCell>
                    {/* Joined */}
                    <TableCell className="text-muted-foreground">{member.joinedAt}</TableCell>
                    {/* More */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">더보기</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <UserCog className="size-4" />
                            프로필 보기
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="size-4" />
                            메일 보내기
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            <Ban className="size-4" />
                            비활성화
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableCaption>
              총 {sorted.length}명 중 {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, sorted.length)}번째 멤버
            </TableCaption>
          </Table>

          {/* ---- Pagination ---- */}
          {totalPages > 1 && (
            <div className="border-t px-4 py-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)); }}
                      className={safePage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === safePage}
                        onClick={(e) => { e.preventDefault(); setPage(p); }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)); }}
                      className={safePage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

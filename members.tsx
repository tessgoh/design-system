"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
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
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  UserCog,
  Mail,
  Ban,
  CircleHelp,
  UserRound,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Member {
  id: number;
  name: string;
  isMe?: boolean;
  email: string;
  service: string;
  status: "active" | "inactive" | "pending";
  role: "Admin" | "Member";
  lastAccess: string; // ISO or "-"
  joinedAt: string;   // ISO
}

type SortKey = "name" | "email" | "service" | "status" | "role" | "lastAccess" | "joinedAt";
type SortDir = "asc" | "desc";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const MEMBERS: Member[] = [
  { id: 1, name: "홍길동", isMe: true, email: "alex.kim@letsur.ai", service: "Button CTA", status: "active", role: "Admin", lastAccess: "2026-02-10T11:48:00", joinedAt: "2025-12-18" },
  { id: 2, name: "김민수", email: "sarah.dev@letsur.ai", service: "Button CTA", status: "active", role: "Member", lastAccess: "2026-02-10T11:15:00", joinedAt: "2025-12-22" },
  { id: 3, name: "이서연", email: "james.tech@letsur.ai", service: "Button CTA", status: "inactive", role: "Member", lastAccess: "2026-02-10T10:00:00", joinedAt: "2025-12-28" },
  { id: 4, name: "박지훈", email: "mia.design@letsur.ai", service: "Button CTA", status: "inactive", role: "Member", lastAccess: "2026-02-10T06:00:00", joinedAt: "2026-01-03" },
  { id: 5, name: "정하늘", email: "noah.product@letsur.ai", service: "Button CTA", status: "active", role: "Admin", lastAccess: "2026-02-09T14:00:00", joinedAt: "2026-01-10" },
  { id: 6, name: "최유나", email: "ava.marketing@letsur.ai", service: "Button CTA", status: "inactive", role: "Member", lastAccess: "2026-02-09T00:00:00", joinedAt: "2026-01-18" },
  { id: 7, name: "강태오", email: "liam.support@letsur.ai", service: "Button CTA", status: "inactive", role: "Member", lastAccess: "2026-02-08T00:00:00", joinedAt: "2026-01-22" },
  { id: 8, name: "윤서진", email: "emma.data@letsur.ai", service: "Button CTA", status: "pending", role: "Member", lastAccess: "-", joinedAt: "2026-01-28" },
  { id: 9, name: "신지우", email: "oliver.analytics@letsur.ai", service: "Button CTA", status: "active", role: "Member", lastAccess: "2026-02-07T00:00:00", joinedAt: "2026-02-01" },
  { id: 10, name: "황도현", email: "sophia.community@letsur.ai", service: "Button CTA", status: "active", role: "Member", lastAccess: "2026-02-03T00:00:00", joinedAt: "2026-02-08" },
  { id: 11, name: "문채원", email: "chaewon.moon@letsur.ai", service: "Button CTA", status: "active", role: "Admin", lastAccess: "2026-02-10T09:00:00", joinedAt: "2024-04-10" },
  { id: 12, name: "배진우", email: "jinwoo.bae@letsur.ai", service: "Button CTA", status: "inactive", role: "Member", lastAccess: "2025-10-30T00:00:00", joinedAt: "2024-08-15" },
  { id: 13, name: "조예린", email: "yerin.jo@letsur.ai", service: "Button CTA", status: "active", role: "Member", lastAccess: "2026-02-10T08:00:00", joinedAt: "2025-05-22" },
  { id: 14, name: "허태양", email: "taeyang.heo@letsur.ai", service: "Button CTA", status: "active", role: "Member", lastAccess: "2026-02-10T07:30:00", joinedAt: "2025-07-11" },
  { id: 15, name: "송다인", email: "dain.song@letsur.ai", service: "Button CTA", status: "pending", role: "Member", lastAccess: "-", joinedAt: "2026-01-15" },
  { id: 16, name: "유승호", email: "seungho.yoo@letsur.ai", service: "Button CTA", status: "active", role: "Admin", lastAccess: "2026-02-10T11:30:00", joinedAt: "2023-12-05" },
  { id: 17, name: "장하린", email: "harin.jang@letsur.ai", service: "Button CTA", status: "inactive", role: "Member", lastAccess: "2025-09-18T00:00:00", joinedAt: "2024-11-20" },
  { id: 18, name: "권도현", email: "dohyun.kwon@letsur.ai", service: "Button CTA", status: "active", role: "Member", lastAccess: "2026-02-10T10:45:00", joinedAt: "2025-10-03" },
  { id: 19, name: "나은빈", email: "eunbin.na@letsur.ai", service: "Button CTA", status: "pending", role: "Member", lastAccess: "-", joinedAt: "2026-01-28" },
  { id: 20, name: "서지훈", email: "jihoon.seo@letsur.ai", service: "Button CTA", status: "active", role: "Member", lastAccess: "2026-02-10T11:00:00", joinedAt: "2025-09-01" },
];

const PAGE_SIZE = 10;
const NOW = new Date("2026-02-10T12:00:00");

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function relativeTime(iso: string): string {
  if (iso === "-") return "-";
  const diff = NOW.getTime() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "하루 전";
  return `${days}일 전`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

/* ------------------------------------------------------------------ */
/*  Sortable Head                                                      */
/* ------------------------------------------------------------------ */

function SortableHead({
  children,
  sortKey,
  currentSort,
  currentDir,
  onSort,
  className,
  extra,
}: {
  children: React.ReactNode;
  sortKey: SortKey;
  currentSort: SortKey | null;
  currentDir: SortDir;
  onSort: (key: SortKey) => void;
  className?: string;
  extra?: React.ReactNode;
}) {
  const active = currentSort === sortKey;
  return (
    <TableHead className={className}>
      <button
        type="button"
        className="inline-flex items-center gap-1 text-gray-500 hover:text-foreground transition-colors"
        onClick={() => onSort(sortKey)}
      >
        {children}
        {extra}
        {active ? (
          currentDir === "asc" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />
        ) : (
          <ArrowUpDown className="size-3 opacity-40" />
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
        <Badge variant="secondary" className="rounded bg-success-50 text-success-700 border-0 px-2 py-0.5 text-xs font-medium">
          활성
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="secondary" className="rounded bg-gray-100 text-gray-600 border-0 px-2 py-0.5 text-xs font-medium">
          비활성
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary" className="rounded bg-warning-50 text-warning-700 border-0 px-2 py-0.5 text-xs font-medium">
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

  /* Filter */
  const filtered = members.filter((m) => {
    if (roleFilter !== "all" && m.role !== roleFilter) return false;
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
    }
    return true;
  });

  /* Sort */
  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  React.useEffect(() => { setPage(1); }, [roleFilter, statusFilter, search]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  function handleRoleChange(id: number, role: "Admin" | "Member") {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  }

  return (
    <div className="min-h-screen bg-white px-8 py-6">
      {/* ---- Toolbar ---- */}
      <div className="flex items-center justify-between gap-4 pb-4">
        {/* Left: Filters */}
        <div className="flex items-center gap-3">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[120px] h-9 rounded-lg border-gray-300 text-sm text-gray-700">
              <SelectValue placeholder="역할" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">역할</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Member">Member</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px] h-9 rounded-lg border-gray-300 text-sm text-gray-700">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">상태</SelectItem>
              <SelectItem value="active">활성</SelectItem>
              <SelectItem value="inactive">비활성</SelectItem>
              <SelectItem value="pending">대기</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right: Search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="이름 또는 이메일"
            className="h-9 rounded-lg border-gray-300 pl-9 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ---- Table ---- */}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200">
            <SortableHead sortKey="name" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="pl-4 text-xs text-gray-500 font-medium">
              이름
            </SortableHead>
            <SortableHead sortKey="email" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="text-xs text-gray-500 font-medium">
              이메일
            </SortableHead>
            <SortableHead sortKey="service" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="text-xs text-gray-500 font-medium">
              서비스
            </SortableHead>
            <SortableHead sortKey="status" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="text-xs text-gray-500 font-medium">
              상태
            </SortableHead>
            <SortableHead
              sortKey="role"
              currentSort={sortKey}
              currentDir={sortDir}
              onSort={handleSort}
              className="text-xs text-gray-500 font-medium"
              extra={<CircleHelp className="size-3 text-gray-400" />}
            >
              역할
            </SortableHead>
            <SortableHead sortKey="lastAccess" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="text-xs text-gray-500 font-medium">
              최근 접속
            </SortableHead>
            <SortableHead sortKey="joinedAt" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} className="text-xs text-gray-500 font-medium">
              가입일
            </SortableHead>
            <TableHead className="w-8" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                검색 결과가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            paged.map((member) => (
              <TableRow key={member.id} className="border-b border-gray-100 hover:bg-gray-25">
                {/* Name */}
                <TableCell className="pl-4 py-4">
                  {member.isMe ? (
                    <span className="text-sm font-semibold text-gray-900 underline underline-offset-2">
                      {member.name}(나)
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900">
                      {member.name}
                    </span>
                  )}
                </TableCell>
                {/* Email */}
                <TableCell className="py-4 text-sm text-gray-600">
                  {member.email}
                </TableCell>
                {/* Service */}
                <TableCell className="py-4">
                  <span className="text-sm font-medium text-brand-600 cursor-pointer hover:text-brand-700">
                    {member.service}
                  </span>
                </TableCell>
                {/* Status */}
                <TableCell className="py-4">
                  <StatusBadge status={member.status} />
                </TableCell>
                {/* Role */}
                <TableCell className="py-4">
                  <Select
                    value={member.role}
                    onValueChange={(v) => handleRoleChange(member.id, v as "Admin" | "Member")}
                  >
                    <SelectTrigger className="h-8 w-[130px] rounded-lg border-gray-300 text-sm gap-2">
                      <UserRound className="size-4 text-gray-400" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                {/* Last Access */}
                <TableCell className="py-4 text-sm text-gray-600">
                  {relativeTime(member.lastAccess)}
                </TableCell>
                {/* Joined */}
                <TableCell className="py-4 text-sm text-gray-600">
                  {formatDate(member.joinedAt)}
                </TableCell>
                {/* More */}
                <TableCell className="py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="size-4" />
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
      </Table>

      {/* ---- Pagination ---- */}
      {totalPages > 1 && (
        <div className="pt-4">
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
  );
}

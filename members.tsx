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
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Search, LogOut, Users } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Member {
  id: number;
  name: string;
  email: string;
  service: string;
  status: "active" | "inactive";
  role: "Admin" | "Member";
  lastAccess: string;
  joinedAt: string;
}

/* ------------------------------------------------------------------ */
/*  Sample Data                                                        */
/* ------------------------------------------------------------------ */

const MEMBERS: Member[] = [
  { id: 1, name: "김민수", email: "minsu.kim@company.com", service: "Dashboard", status: "active", role: "Admin", lastAccess: "2026-02-06", joinedAt: "2024-03-15" },
  { id: 2, name: "이지영", email: "jiyoung.lee@company.com", service: "Analytics", status: "active", role: "Member", lastAccess: "2026-02-05", joinedAt: "2024-06-22" },
  { id: 3, name: "박서준", email: "seojun.park@company.com", service: "Dashboard", status: "inactive", role: "Member", lastAccess: "2026-01-10", joinedAt: "2024-01-08" },
  { id: 4, name: "최유진", email: "yujin.choi@company.com", service: "CMS", status: "active", role: "Admin", lastAccess: "2026-02-06", joinedAt: "2023-11-30" },
  { id: 5, name: "정하은", email: "haeun.jung@company.com", service: "Analytics", status: "active", role: "Member", lastAccess: "2026-02-04", joinedAt: "2025-01-12" },
  { id: 6, name: "강도윤", email: "doyun.kang@company.com", service: "API Gateway", status: "inactive", role: "Member", lastAccess: "2025-12-20", joinedAt: "2024-07-19" },
  { id: 7, name: "윤서현", email: "seohyun.yoon@company.com", service: "Dashboard", status: "active", role: "Member", lastAccess: "2026-02-06", joinedAt: "2025-04-05" },
  { id: 8, name: "임재혁", email: "jaehyuk.lim@company.com", service: "CMS", status: "active", role: "Admin", lastAccess: "2026-02-03", joinedAt: "2023-09-14" },
  { id: 9, name: "한소희", email: "sohee.han@company.com", service: "Analytics", status: "inactive", role: "Member", lastAccess: "2025-11-15", joinedAt: "2024-10-01" },
  { id: 10, name: "오준서", email: "junseo.oh@company.com", service: "API Gateway", status: "active", role: "Member", lastAccess: "2026-02-06", joinedAt: "2025-08-20" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MembersPage({ onLogout }: { onLogout: () => void }) {
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const filtered = MEMBERS.filter((m) => {
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

        {/* Card wrapping the toolbar + table */}
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
                <TableHead className="pl-4">이름</TableHead>
                <TableHead>서비스</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>최근 접속</TableHead>
                <TableHead>가입일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((member) => (
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
                    <TableCell className="text-muted-foreground">
                      {member.service}
                    </TableCell>
                    {/* Status */}
                    <TableCell>
                      {member.status === "active" ? (
                        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 gap-1.5">
                          <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                          활성
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-border bg-muted text-muted-foreground gap-1.5">
                          <span className="inline-block size-1.5 rounded-full bg-muted-foreground/50" />
                          비활성
                        </Badge>
                      )}
                    </TableCell>
                    {/* Role */}
                    <TableCell>
                      {member.role === "Admin" ? (
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Member
                        </Badge>
                      )}
                    </TableCell>
                    {/* Last Access */}
                    <TableCell className="text-muted-foreground">
                      {member.lastAccess}
                    </TableCell>
                    {/* Joined */}
                    <TableCell className="text-muted-foreground">
                      {member.joinedAt}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableCaption>
              총 {filtered.length}명의 멤버가 표시되고 있습니다.
            </TableCaption>
          </Table>
        </div>
      </main>
    </div>
  );
}

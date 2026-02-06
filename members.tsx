"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
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
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Search, LogOut } from "lucide-react";

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
    <div className="min-h-screen bg-[var(--color-gray-25)]">
      {/* Top Nav */}
      <header className="border-b border-[var(--color-gray-200)] bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)]">
              <svg className="size-4 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5Z" fill="currentColor" />
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[var(--color-gray-900)]">Admin Console</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2 text-[var(--color-gray-600)]">
            <LogOut className="size-4" />
            로그아웃
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[var(--color-gray-950)]">
              멤버 목록
            </CardTitle>
            <CardDescription>
              총 {filtered.length}명의 멤버
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-gray-400)]" />
                <Input
                  placeholder="이름, 이메일, 서비스 검색"
                  className="pl-9 h-8 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--color-gray-50)] hover:bg-[var(--color-gray-50)]">
                  <TableHead>이름</TableHead>
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
                    <TableCell colSpan={6} className="h-24 text-center text-[var(--color-gray-500)]">
                      검색 결과가 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((member) => (
                    <TableRow key={member.id}>
                      {/* Name + Email */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="text-xs font-medium bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
                              {member.name.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-[var(--color-gray-900)]">{member.name}</span>
                            <span className="text-xs text-[var(--color-gray-500)]">{member.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      {/* Service */}
                      <TableCell className="text-sm text-[var(--color-gray-700)]">
                        {member.service}
                      </TableCell>
                      {/* Status */}
                      <TableCell>
                        {member.status === "active" ? (
                          <Badge className="bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border-[var(--color-brand-200)]">
                            <span className="mr-1 inline-block size-1.5 rounded-full bg-[var(--color-brand-500)]" />
                            활성
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-[var(--color-gray-100)] text-[var(--color-gray-600)] border-[var(--color-gray-300)]">
                            <span className="mr-1 inline-block size-1.5 rounded-full bg-[var(--color-gray-400)]" />
                            비활성
                          </Badge>
                        )}
                      </TableCell>
                      {/* Role */}
                      <TableCell>
                        <Badge variant="outline" className={
                          member.role === "Admin"
                            ? "border-[var(--color-brand-200)] text-[var(--color-brand-700)]"
                            : "text-[var(--color-gray-600)]"
                        }>
                          {member.role}
                        </Badge>
                      </TableCell>
                      {/* Last Access */}
                      <TableCell className="text-sm text-[var(--color-gray-600)]">
                        {member.lastAccess}
                      </TableCell>
                      {/* Joined */}
                      <TableCell className="text-sm text-[var(--color-gray-600)]">
                        {member.joinedAt}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

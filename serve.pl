#!/usr/bin/perl
use strict;
use warnings;
use IO::Socket::INET;
use File::Basename;
use POSIX qw(strftime);

my $port = 3456;
my $root = '/Users/connorblades32/Documents/Claude/Worksop Workspace';

my %mime = (
    html => 'text/html',
    css  => 'text/css',
    js   => 'application/javascript',
    png  => 'image/png',
    jpg  => 'image/jpeg',
    jpeg => 'image/jpeg',
    gif  => 'image/gif',
    svg  => 'image/svg+xml',
    ico  => 'image/x-icon',
    woff2=> 'font/woff2',
    woff => 'font/woff',
);

my $server = IO::Socket::INET->new(
    LocalAddr => '127.0.0.1',
    LocalPort => $port,
    Proto     => 'tcp',
    Listen    => 10,
    ReuseAddr => 1,
) or die "Cannot start server: $!";

print "Server running on http://127.0.0.1:$port\n";

while (my $client = $server->accept()) {
    my $request = '';
    while (my $line = <$client>) {
        $request .= $line;
        last if $line eq "\r\n";
    }

    my ($method, $path) = $request =~ /^(\w+)\s+(\S+)/;
    $path = '/index.html' if !$path || $path eq '/';
    $path =~ s/\?.*//;
    $path =~ s/\.\.//g;

    my $file = $root . $path;
    my ($ext) = $file =~ /\.(\w+)$/;
    $ext = lc($ext // 'html');
    my $type = $mime{$ext} // 'application/octet-stream';

    if (-f $file) {
        open(my $fh, '<:raw', $file) or do {
            print $client "HTTP/1.1 403 Forbidden\r\nContent-Length: 9\r\n\r\nForbidden";
            close $client;
            next;
        };
        my $content = do { local $/; <$fh> };
        close $fh;
        my $len = length($content);
        print $client "HTTP/1.1 200 OK\r\nContent-Type: $type\r\nContent-Length: $len\r\nConnection: close\r\n\r\n$content";
    } else {
        print $client "HTTP/1.1 404 Not Found\r\nContent-Length: 13\r\n\r\n404 Not Found";
    }
    close $client;
}

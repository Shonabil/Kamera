<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Session;
use Illuminate\Support\Str;

class SessionController extends Controller
{
    /**
     * Display all completed sessions (for history).
     */
    public function index()
    {
        $sessions = Session::where('status', 'completed')
            ->orderBy('completed_at', 'desc')
            ->limit(20)
            ->get();
        
        return response()->json([
            'data' => $sessions
        ]);
    }

    /**
     * Store a newly created session in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'mode' => 'required|in:photo,video,gif',
            'template_id' => 'nullable|exists:templates,id',
            'metadata' => 'nullable|string'
        ]);

        $sessionCode = strtoupper(Str::random(8));

        $session = Session::create([
            'session_code' => $sessionCode,
            'mode' => $request->mode,
            'template_id' => $request->template_id,
            'status' => 'pending',
            'metadata' => $request->metadata,
            'started_at' => now(),
        ]);

        return response()->json([
            'message' => 'Session created successfully',
            'data' => $session
        ], 201);
    }

    /**
     * Display the specified session.
     */
    public function show(string $id)
    {
        $session = Session::findOrFail($id);
        
        return response()->json([
            'data' => $session
        ]);
    }

    /**
     * Complete the session with final file.
     */
    public function complete(Request $request, string $id)
    {
        $session = Session::findOrFail($id);

        $request->validate([
            'final_file' => 'required|string' // Path to the file from Node.js
        ]);

        $session->update([
            'status' => 'completed',
            'final_file' => $request->final_file,
            'qr_code' => url('/result/' . $session->id), // Example QR data
            'completed_at' => now(),
        ]);

        // If using Reverb, broadcast an event here
        // SessionCompleted::dispatch($session);

        return response()->json([
            'message' => 'Session completed successfully',
            'data' => $session
        ]);
    }
}

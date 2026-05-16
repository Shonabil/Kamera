<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
        });

        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['photostrip', 'grid', 'video']);
            $table->string('thumbnail')->nullable();
            $table->string('frame_file')->nullable();
            $table->integer('total_slots');
            $table->string('aspect_ratio')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('template_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('template_id')->constrained()->cascadeOnDelete();
            $table->integer('slot_number');
            $table->float('x')->default(0);
            $table->float('y')->default(0);
            $table->float('width')->default(0);
            $table->float('height')->default(0);
            $table->float('rotation')->default(0);
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->nullable()->constrained('customers')->nullOnDelete();
            $table->foreignId('template_id')->nullable()->constrained('templates')->nullOnDelete();
            $table->string('session_code')->unique();
            $table->enum('mode', ['photo', 'video', 'gif']);
            $table->integer('total_capture')->default(0);
            $table->integer('total_selected')->default(0);
            $table->string('status')->default('pending');
            $table->string('final_file')->nullable();
            $table->string('qr_code')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps(); // Instead of created_at only
        });

        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('sessions')->cascadeOnDelete();
            $table->string('file_path');
            $table->string('thumbnail')->nullable();
            $table->integer('capture_order');
            $table->boolean('is_selected')->default(false);
            $table->timestamps();
        });

        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('sessions')->cascadeOnDelete();
            $table->string('file_path');
            $table->float('duration')->default(0);
            $table->enum('type', ['raw', 'boomerang', 'final']);
            $table->timestamps();
        });

        Schema::create('gifs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('sessions')->cascadeOnDelete();
            $table->string('file_path');
            $table->float('duration')->default(0);
            $table->integer('total_frames')->default(0);
            $table->timestamps();
        });

        Schema::create('photo_edits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('photo_id')->constrained('photos')->cascadeOnDelete();
            $table->foreignId('template_slot_id')->constrained('template_slots')->cascadeOnDelete();
            $table->float('scale')->default(1);
            $table->float('rotate')->default(0);
            $table->float('position_x')->default(0);
            $table->float('position_y')->default(0);
        });

        Schema::create('prints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('sessions')->cascadeOnDelete();
            $table->string('printed_by')->nullable();
            $table->string('printer_name')->nullable();
            $table->integer('total_print')->default(1);
            $table->timestamp('printed_at')->nullable();
        });

        Schema::create('downloads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('sessions')->cascadeOnDelete();
            $table->string('download_token')->unique();
            $table->timestamp('expired_at')->nullable();
            $table->integer('total_download')->default(0);
        });

        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['camera', 'printer']);
            $table->string('connection_type')->nullable();
            $table->string('status')->default('offline');
            $table->json('metadata')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
        Schema::dropIfExists('downloads');
        Schema::dropIfExists('prints');
        Schema::dropIfExists('photo_edits');
        Schema::dropIfExists('gifs');
        Schema::dropIfExists('videos');
        Schema::dropIfExists('photos');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('template_slots');
        Schema::dropIfExists('templates');
        Schema::dropIfExists('customers');
    }
};

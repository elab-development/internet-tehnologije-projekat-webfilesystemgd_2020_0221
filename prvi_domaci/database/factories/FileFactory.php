<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'path' => $this->faker->filePath,
            'size' => $this->faker->numberBetween(1, 10000),
            'mime_type' => $this->faker->mimeType,
            'google_drive_id' => $this->faker->uuid,
            'user_id' => User::factory(),
        ];
    }
}

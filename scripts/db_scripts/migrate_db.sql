#!/usr/bin/env bash
# Automatically generate and apply migration

# Ensure a migration message is provided
if [ -z "$1" ]; then
    echo "Usage: $0 '<migration message>'"
    exit 1
fi

# Generate the Alembic migration with the provided message
alembic revision --autogenerate -m "$1"

# Check if the migration was created successfully
if [ $? -ne 0 ]; then
    echo "Migration generation failed."
    exit 1
fi

# Apply the migration
alembic upgrade head

# Check if the migration was applied successfully
if [ $? -eq 0 ]; then
    echo "Migration applied successfully!"
else
    echo "Migration failed."
    exit 1
fi
